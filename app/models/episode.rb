class Episode < ActiveRecord::Base
  has_and_belongs_to_many :persons
  belongs_to :program

  def as_json(options={})
    super.as_json(options).merge({
                                     :program => self.program,
                                     :guests => self.persons
                                 })
  end
end
