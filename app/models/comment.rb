class Comment < ActiveRecord::Base
  belongs_to :episode

  validates :comment, presence: false, length: { in: 0..32 }
  validates :seconds, presence: true, numericality: {
      only_integer: true,
      greater_than_or_equal_to: 0,
      less_than_or_equal_to: 9999
  }
end
