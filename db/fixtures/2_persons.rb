require 'csv'

csv = CSV.read('db/csv/persons.csv')

csv.each_with_index do |line, i|
  next if i == 0 # headerをスキップ

  Person.seed do |s|
    s.id         = line[0]
    s.name_ja    = line[1]
    s.name_en    = line[2]
    s.nickname   = line[3]
    s.twitter_id = line[4]
  end
end