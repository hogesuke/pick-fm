#!/usr/bin/env ruby
require "csv"

def wrap(str)
  if str.nil?
    return '""'
  end
  unless str.start_with?('[') and str.end_with?(']')
    return '"' + str + '"'
  end
  str
end

CSV.open("data/tracks.csv", "r") do |f|
  f.each_with_index do |item, i|
    next if i == 0
    p item
    `curl -XPUT 'http://localhost:9200/pickfm/track/#{item[0]}' -d '
      {
        "id": #{i},
        "program_name": #{wrap(item[0])},
        "personality_en": #{wrap(item[1])},
        "personality_ja": #{wrap(item[2])},
        "guests_en": #{wrap(item[3])},
        "guests_ja": #{wrap(item[4])},
        "episode": #{wrap(item[5])},
        "tag_en": #{wrap(item[6])},
        "tag_ja": #{wrap(item[7])},
        "url": #{wrap(item[8])},
        "start_time": #{item[9]},
        "end_time": #{item[10]}
      }
    '`
  end
end
