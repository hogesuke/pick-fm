require 'csv'

csv = CSV.read('db/csv/episodes.csv')

csv.each_with_index do |line, i|
  next if i == 0 # headerをスキップ

  program = Program.where({ name: line[1] }).first

  Episode.seed do |s|
    s.id           = line[0]
    s.program_id   = program.id
    s.episode_no   = line[2]
    s.episode_type = line[3]
    s.url          = line[4]
    s.time_length  = line[6]
    s.delivered_at = line[7]
  end
end