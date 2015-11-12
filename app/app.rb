# coding: utf-8

require 'sinatra'
require 'sinatra/reloader'
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

end
