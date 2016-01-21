class Program < ActiveRecord::Base
  has_and_belongs_to_many :persons
  has_many :episodes
end