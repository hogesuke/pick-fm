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

after do
  # todo
end

get '/' do
  client = Elasticsearch::Client.new log: true
  client.transport.reload_connections!
  client.cluster.health
  results = client.search q: 'test'

  results['hits'].to_json
end
