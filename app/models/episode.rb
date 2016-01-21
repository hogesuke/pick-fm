class Episode < ActiveRecord::Base
  has_and_belongs_to_many :persons
  belongs_to :program
end
