class Episode < ActiveRecord::Base
  has_and_belongs_to_many :persons
  belongs_to :program

  attr_accessor :tracks

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
