require 'csv'

csv = CSV.read('db/csv/programs.csv')

csv.each_with_index do |line, i|
  next if i == 0 # headerをスキップ

  Program.seed do |s|
    s.id          = line[0]
    s.name        = line[1]
    s.description = line[2]
    s.thumbnail   = line[3]
  end
end