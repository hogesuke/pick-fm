#!/usr/bin/env ruby
require 'csv'
require 'json'

def wrap(str)
  return '""' if str.nil?
  return '"' + str + '"' unless str.start_with?('[') && str.end_with?(']')

  str
end

def max_id
  track = `curl -XGET 'http://localhost:9200/pickfm/track/_search' -d '{ "sort": { "id": { "order": "desc" } }, "size": 1 }'`
  track = JSON.parse(track)

  return 0 unless track['hits']['total'] > 0

  track['hits']['hits'][0]['_source']['id']
end

start_id = max_id

CSV.open("data/tracks_#{ARGV[0]}.csv", 'r') do |f|
  f.each_with_index do |item, i|
    next if i == 0
    p item
    `curl -XPUT 'http://localhost:9200/pickfm/track/#{ start_id + i }' -d '
      {
        "id": #{ start_id + i },
        "program_id": #{ item[0] },
        "episode_no": #{ item[1] },
        "episode_type": #{ wrap(item[2]) },
        "tag_en": #{ wrap(item[3]) },
        "tag_ja": #{ wrap(item[4]) },
        "start_time": #{ item[5] },
        "end_time": #{ item[6] }
      }
    '`
  end
end
