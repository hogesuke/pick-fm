class Program < ActiveRecord::Base
  has_and_belongs_to_many :persons
  has_many :episodes

  scope :find_with_name, -> (name) do
    where('name like ?', "%#{name}%")
  end

  def as_json(options={})
    super.as_json(options).merge({:personalities => self.persons})
  end
end