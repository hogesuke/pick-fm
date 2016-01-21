class Person < ActiveRecord::Base
  has_and_belongs_to_many :programs
  has_and_belongs_to_many :episodes
end
