class Episode < ActiveRecord::Base
  has_and_belongs_to_many :persons
  has_many :comments
  belongs_to :program

  attr_accessor :tracks

  scope :find_by_guest_id, -> (guest_id) do
    joins(:persons).merge(Person.where({ :id => guest_id }))
  end

  def save_comment(text, seconds)
    comment = Comment.new
    comment.episode_id = self.id
    comment.comment    = text
    comment.seconds    = seconds
    comment.save!

    comment
  end

  def as_json(options={})
    super.as_json(options).merge({
                                     program:  self.program,
                                     guests:   self.persons,
                                     comments: self.comments,
                                     tracks:   get_tracks
                                 })
  end

  def get_tracks
    self.tracks
  end
end
