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
ActiveRecord::Base.logger = Logger.new(STDOUT) # todo あとで消す

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
  search_word = params[:search_word]

  if search_word.nil?
    status(400)
    return { msg: '検索文字列を指定してください' }.to_json
  end

  client = Elasticsearch::Client.new(log: false)
  client.transport.reload_connections!
  client.cluster.health
  results = client.search(index: 'pickfm', body: {
    query: {
        simple_query_string: {
            fields: %w(tag_en tag_ja),
            query: search_word,
            default_operator: 'and'
        }
    },
    sort: 'episode_no'
  })

  episodes = []

  results['hits']['hits'].each do |r|
    source = r['_source']
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

    source['episode_tracks'] = episode_tracks['hits']['hits'].collect { |h| h['_source'] }

    exist = episodes.any? { |e| e['program_id'] == source['program_id'].to_i and e['episode_no'] == source['episode_no'].to_i }

    unless exist
      episode = Episode.where({ :program_id => source['program_id'], :episode_no => source['episode_no'] }).first
      episodes.push(episode)
    end
  end

  {
      :hits     => results['hits']['hits'].collect { |h| h['_source'] },
      :episodes => episodes
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
  id = params[:id]

  unless valid_number?(id)
    status(400)
    return { err_msg: 'パラメータが不正です' }.to_json
  end

  program = Program.find(id)
  episodes = program.episodes

  episodes.to_json
end

get '/episodes/:id' do
  id = params[:id]

  unless valid_number?(id)
    status(400)
    return { err_msg: 'パラメータが不正です' }.to_json
  end

  Episode.find(id).to_json
end

def valid_number?(id)
  return false if id.nil?
  return false unless id =~ /[0-9]+/
  return false if id.to_i <= 0
  true
end
