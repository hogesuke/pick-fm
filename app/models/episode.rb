class Episode < ActiveRecord::Base
  has_and_belongs_to_many :persons
  belongs_to :program

  attr_accessor :tracks

  scope :find_by_guest, -> (guest) do
    joins(:persons).merge(Person.where('name_ja = ? or name_en = ? or nickname = ?', guest, guest, guest))
  end

  def as_json(options={})
    super.as_json(options).merge({
                                     :program => self.program,
                                     :guests  => self.persons,
                                     :tracks  => get_tracks
                                 })
  end

  def get_tracks
    self.tracks
  end
end
