require 'sinatra/activerecord'
require 'sinatra/activerecord/rake'
require 'seed-fu'

namespace :db do
  task :seed_fu => :environment do

    if ENV['FILTER']
      filter = /#{ENV['FILTER'].gsub(/,/, '|')}/
    end

    if ENV['FIXTURE_PATH']
      fixture_paths = [ENV['FIXTURE_PATH'], ENV['FIXTURE_PATH'] + '/' + settings.environment.to_s]
    end

    SeedFu.seed(fixture_paths, filter)
  end

  task :load_config do
    require './app/app'
  end
end

Rake::Task['db:seed_fu'].enhance(['db:load_config'])

# SeedFu.fixture_paths = [
#     Pathname(settings.root).join('db/fixtures').to_s,
#     Pathname(settings.root).join('db/fixtures/#{settings.environment}').to_s
# ]
