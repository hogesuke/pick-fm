#!/usr/bin/env ruby
require 'csv'

def wrap(str)
  return '""' if str.nil?
  return '"' + str + '"' unless str.start_with?('[') && str.end_with?(']')

  str
end

CSV.open('data/tracks.csv', 'r') do |f|
  f.each_with_index do |item, i|
    next if i == 0
    p item
    `curl -XPUT 'http://localhost:9200/pickfm/track/#{i}' -d '
      {
        "id": #{i},
        "program_id": #{item[0]},
        "episode_no": #{item[1]},
        "episode_type": #{wrap(item[2])},
        "tag_en": #{wrap(item[3])},
        "tag_ja": #{wrap(item[4])},
        "start_time": #{item[5]},
        "end_time": #{item[6]}
      }
    '`
  end
end
