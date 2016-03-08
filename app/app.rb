# coding: utf-8
require 'sinatra'
require 'sinatra/reloader'
require 'active_record'
require 'active_support'
require 'elasticsearch'
require 'json'
require 'pp'
require_relative 'models/program'
require_relative 'models/person'
require_relative 'models/episode'

ActiveRecord::Base.configurations = YAML.load_file(File.join(__dir__, '../config/database.yml'))
ActiveRecord::Base.establish_connection(settings.environment)
# ActiveRecord::Base.logger = Logger.new(STDOUT) # todo あとで消す

configure :production, :development do

  # 単数・複数形の定義
  ActiveSupport::Inflector.inflections do |inflect|
    inflect.plural 'person', 'persons'
    inflect.singular 'persons', 'person'
  end

  # todo 他必要なのないか要確認
end

configure :development do
  set :server, 'webrick'
end

before do
  headers({'Content-Type' => 'application/json'})
end

after do
  # todo
end

get '/search' do
  words           = params[:word]
  filter_programs = params[:program]
  filter_guests   = params[:guest]
  page            = params[:page]
  per_page        = params[:perpage]
  sort            = params[:sort]

  unless valid_number?(page) and valid_number?(per_page) and ['asc', 'desc', 'ASC', 'DESC'].include?(sort)
    status(400)
    return { err_msg: 'パラメータが不正です' }.to_json
  end

  if words.nil?
    status(400)
    return { msg: '検索文字列を指定してください' }.to_json
  end

  page     = page.to_i
  per_page = per_page.to_i
  sort     = sort.downcase

  words           = words.strip.split(/\s+/)
  filter_programs = filter_programs.split(',') unless filter_programs.nil?
  filter_guests   = filter_guests.split(',') unless filter_guests.nil?

  filter_conditions = []

  unless filter_programs.nil?
    p_cond = generate_program_conditions(filter_programs)

    if p_cond.nil?
      return { hits: [], episodes: [], total: 0 }.to_json
    end

    filter_conditions.push(p_cond)
  end

  unless filter_guests.nil?
    g_cond = generate_guest_conditions(filter_guests)

    if g_cond.nil?
      return { hits: [], episodes: [], total: 0 }.to_json
    end

    filter_conditions.push(g_cond)
  end

  condition = {
      sort: [
          {episode_no:   {order: sort}},
          {episode_type: {order: sort == 'asc' ? 'desc' : 'asc'}},
          {start_time:   {order: 'asc'}}
      ],
      from: per_page * (page - 1),
      size: per_page
  }

  unless words.nil?
    condition[:query] = {
        simple_query_string: {
            fields: %w(tag_en tag_ja),
            query: words.join(' '),
            default_operator: 'and'
        }
    }
  end

  if filter_conditions.size > 0
    condition[:filter] = {
        and: filter_conditions
    }
  end

  # todo clientって使いまわせないかね？
  client = Elasticsearch::Client.new(log: false)
  client.transport.reload_connections!
  client.cluster.health
  results = client.search(index: 'pickfm', body: condition)

  episodes = []

  results['hits']['hits'].each do |r|
    source = r['_source']

    # すでにEpisodeを取得済みか
    exist = episodes.any? { |e| e['program_id'] == source['program_id'].to_i and e['episode_no'] == source['episode_no'].to_i }

    unless exist
      # まだ取得していない場合
      episode = Episode.where({
                                  :program_id   => source['program_id'],
                                  :episode_no   => source['episode_no'],
                                  :episode_type => source['episode_type']
                              }).first

      episode_tracks = client.search(index: 'pickfm',
                                     body: {
                                         filter: {
                                             and: [
                                                 {
                                                     term: {
                                                         episode_no: source['episode_no'],
                                                     }
                                                 },
                                                 {
                                                     term: {
                                                         episode_type: source['episode_type']
                                                     }
                                                 }
                                             ]
                                         },
                                         sort: 'start_time',
                                         size: 100
                                     })

      episode.tracks = episode_tracks['hits']['hits'].collect { |h| h['_source'] }
      episodes.push(episode)
    end
  end

  {
      :hits     => results['hits']['hits'].collect { |h| h['_source'] },
      :episodes => episodes,
      :total    => results['hits']['total']
  }.to_json
end

get '/programs/:id' do
  id = params[:id]

  unless valid_number?(id)
    status(400)
    return { err_msg: 'パラメータが不正です' }.to_json
  end

  Program.find(id).to_json
end

get '/programs' do
  Program.all.to_json
end

get '/programs/:id/episodes' do
  id       = params[:id]
  page     = params[:page]
  per_page = params[:perpage]
  sort     = params[:sort]

  unless valid_number?(page) and valid_number?(per_page) and ['asc', 'desc', 'ASC', 'DESC'].include?(sort)
    status(400)
    return { err_msg: 'パラメータが不正です' }.to_json
  end

  page     = page.to_i
  per_page = per_page.to_i
  offset   = per_page * (page - 1)
  sort     = sort.downcase

  program  = Program.find(id)
  episodes = program.episodes.offset(offset).limit(per_page).order("episode_no #{sort}, episode_type #{sort == 'asc' ? 'desc' : 'asc'}")
  total    = program.episodes.count(:id)

  client = Elasticsearch::Client.new(log: false)
  client.transport.reload_connections!
  client.cluster.health

  # todo 【！！！】programで絞込みできてない
  episodes.each do |e|
    results = client.search(index: 'pickfm',
                            body: {
                                filter: {
                                    and: [
                                        {
                                            term: {
                                                episode_no: e.episode_no,
                                            }
                                        },
                                        {
                                            term: {
                                                episode_type: e.episode_type
                                            }
                                        }
                                    ]
                                },
                                sort: 'start_time',
                                size: 100
                            })

    e.tracks = results['hits']['hits'].collect { |h| h['_source'] }
  end

  { :episodes => episodes, :total => total }.to_json
end

get '/programs/:program_id/episodes/:episode_no/:episode_type' do
  program_id   = params[:program_id]
  episode_no   = params[:episode_no]
  episode_type = params[:episode_type]

  unless valid_number?(program_id) and valid_number?(episode_no)
    status(400)
    return { err_msg: 'パラメータが不正です' }.to_json
  end

  episode = Episode.where({ :program_id => program_id, :episode_no => episode_no, :episode_type => episode_type }).first

  client = Elasticsearch::Client.new(log: false)
  client.transport.reload_connections!
  client.cluster.health

  # todo 【！！！】programで絞込みできてない
  results = client.search(index: 'pickfm',
                          body: {
                              filter: {
                                  and: [
                                      {
                                          term: {
                                              episode_no: episode.episode_no,
                                          }
                                      },
                                      {
                                          term: {
                                              episode_type: episode.episode_type
                                          }
                                      }
                                  ]
                              },
                              sort: 'start_time',
                              size: 100
                          })

  episode.tracks = results['hits']['hits'].collect { |h| h['_source'] }

  episode.to_json
end

get '/episodes/:id' do
  id = params[:id]

  unless valid_number?(id)
    status(400)
    return { err_msg: 'パラメータが不正です' }.to_json
  end

  Episode.find(id).to_json
end

get '/guests' do
  ids = params[:ids]

  if ids.nil?
    status(400)
    return { msg: '取得対象のIDを指定してください' }.to_json
  end

  ids = ids.split(',')

  ids.each do |id|
    unless valid_number?(id)
      status(400)
      return { err_msg: 'パラメータが不正です' }.to_json
    end
  end

  Person.find(ids).to_json
end

get '/guests/:id/episodes' do
  id       = params[:id]
  page     = params[:page]
  per_page = params[:perpage]
  sort     = params[:sort]

  unless valid_number?(page) and valid_number?(per_page) and ['asc', 'desc', 'ASC', 'DESC'].include?(sort)
    status(400)
    return { err_msg: 'パラメータが不正です' }.to_json
  end

  page     = page.to_i
  per_page = per_page.to_i
  offset   = per_page * (page - 1)

  person   = Person.find(id)
  episodes = person.episodes.offset(offset).limit(per_page).order("episode_no #{sort}, episode_type #{sort == 'asc' ? 'desc' : 'asc'}")
  total    = person.episodes.count(:id)

  client = Elasticsearch::Client.new(log: false)
  client.transport.reload_connections!
  client.cluster.health

  # todo いい加減、共通化すること
  episodes.each do |e|
    results = client.search(index: 'pickfm',
                            body: {
                                filter: {
                                    and: [
                                        {
                                            term: {
                                                program_id: e.program_id,
                                            }
                                        },
                                        {
                                            term: {
                                                episode_no: e.episode_no,
                                            }
                                        },
                                        {
                                            term: {
                                                episode_type: e.episode_type
                                            }
                                        }
                                    ]
                                },
                                sort: 'start_time',
                                size: 100
                            })

    e.tracks = results['hits']['hits'].collect { |h| h['_source'] }
  end

  { episodes: episodes, total: total }.to_json
end

def generate_guest_conditions(guest_ids)
  conditions = []

  guest_ids.each do |guest_id|
    episodes = Episode.find_by_guest_id(guest_id)
    episodes.each do |e|
      conditions.push({
                          and: [
                              {
                                  term: {
                                      program_id: e.program_id
                                  }
                              },
                              {
                                  term: {
                                      episode_no: e.episode_no,
                                  }
                              },
                              {
                                  term: {
                                      episode_type: e.episode_type,
                                  }
                              }
                          ]
                      })
    end
  end

  if conditions.size == 0
    return nil
  end

  { or: conditions }
end

def generate_program_conditions(program_ids)
  conditions = []

  program_ids.each do |program_id|
    program = Program.find(program_id)
    conditions.push({
                        term: {
                            program_id: program.id
                        }
                    })
  end

  if conditions.size == 0
    return nil
  end

  { or: conditions }
end

def valid_number?(id)
  return false if id.nil?
  return false unless id =~ /[0-9]+/
  return false if id.to_i <= 0
  true
end
