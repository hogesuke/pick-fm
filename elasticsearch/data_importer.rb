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
        "guests_en": "#{item[3]}",
        "guests_ja": "#{item[4]}",
        "episode": "#{item[5]}",
        "tag_en": #{item[6]},
        "tag_ja": "#{item[7]}",
        "url": "#{item[8]}",
        "start_time": "#{item[9]}",
        "end_time": "#{item[10]}"
      }
    '`
  end
end