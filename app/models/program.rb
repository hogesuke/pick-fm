class Program < ActiveRecord::Base
  has_and_belongs_to_many :persons
  has_many :episodes

  def as_json(options = {})
    super.as_json(options).merge(personalities: persons)
  end
end
