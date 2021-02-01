class OtherChannel < ApplicationCable::Channel

  def subscribed
    sleep 3
    stream_from "other"
    ActionCable.server.broadcast("other", { type: 'SERVER_ACTION' })
  end

end
