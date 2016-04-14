require 'csv'

csv = CSV.read('db/csv/persons_programs.csv')

ActiveRecord::Base.connection.execute('DELETE FROM persons_programs;')

csv.each_with_index do |line, i|
  next if i == 0 # headerをスキップ

  person = Person.where('name_ja = :name OR name_en = :name OR nickname = :name', name: line[0]).first
  program = Program.where({ name: line[1] }).first

  program.persons << person
end