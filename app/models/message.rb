class Message < ApplicationRecord

  def self.recent
    Message.last(15).map(&:info)
  end

  def formatted_time
    self.created_at.localtime.strftime('%A, %d %b %Y %l:%M %p')
  end

  def info
    {
      name: self.name,
      msg: self.msg,
      time: self.formatted_time
    }
  end

end
