require 'csv'
require 'json'

csv = CSV.read('db/csv/episodes_persons.csv')

ActiveRecord::Base.connection.execute('DELETE FROM episodes_persons;')

csv.each_with_index do |line, i|
  next if i == 0 # headerをスキップ

  guests = JSON.parse(line[3])

  where_name_ja  = Person.where(name_ja: guests).where_values.reduce(:and)
  where_name_en  = Person.where(name_en: guests).where_values.reduce(:and)
  where_nickname = Person.where(nickname: guests).where_values.reduce(:and)

  program = Program.where({ name: line[0] }).first
  episode = Episode.where({ program_id: program.id, episode_no: line[1], episode_type: line[2] }).first
  persons = Person.where(where_name_ja.or(where_name_en.or(where_nickname)))

  episode.persons.concat(persons)
end