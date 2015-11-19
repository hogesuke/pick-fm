# coding: utf-8
require 'sinatra'
require 'sinatra/reloader'
require 'elasticsearch'
require 'json'
require 'pp'

configure :production, :development do
  # todo
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
    sort: 'episode'
  })

  results['hits']['hits'].each do |r|
    source = r['_source']
    episode_tracks = client.search(index: 'pickfm', body: { query: { match: { episode: source['episode'] }}, sort: 'start_time', size: 100})

    r['_episode_tracks'] = episode_tracks['hits']
  end

  results['hits'].to_json
end
