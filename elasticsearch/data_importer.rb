#!/usr/bin/env ruby
require "csv"

CSV.open("data/tracks.csv", "r") do |f|
  f.each_with_index do |item, i|
    next if i == 0
    p item
    `curl -XPUT 'http://localhost:9200/pickfm/track/#{item[0]}' -d '
      {
        "id": "#{item[0]}",
        "program_name": "#{item[1]}",
        "personality": "#{item[2]}",
        "guests": "#{item[3]}",
        "episode": "#{item[4]}",
        "tag": "#{item[5]}",
        "start_time": "#{item[6]}",
        "end_time": "#{item[7]}"
      }
    '`
  end
end