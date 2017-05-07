class ChatChannel < ApplicationCable::Channel
  def subscribed
    @message = Message.first || Message.create(message: "Newly created message.")
    stream_from "chatting"
  end

  def receive(action)
    if action["type"] == "GET_MSG"
      ActionCable.server.broadcast("chatting", { type: "CHANGE_MSG", value: @message.message })
    end
    if action["type"] == "CHANGE_MSG"
      @message.update_attributes(message: action["value"])
      ActionCable.server.broadcast("chatting", { type: "CHANGE_MSG", value: @message.message })
    end
    if action["type"] == "GET_COLOR"
      color = Color.find_by_active(true)
      ActionCable.server.broadcast("chatting", { type: "ACTIVATE_COLOR", value: color.display })
      ActionCable.server.broadcast("chatting", { type: "NEW_COLORS", value: Color.all.map{|c| [c.id, c.active, c.display]} })
    end
    if action["type"] == "SELECT_COLOR"
      color = Color.find(action["id"])
      Color.find_by_active(true).update_attributes(active: false)
      color.active = true
      color.save
      ActionCable.server.broadcast("chatting", { type: "ACTIVATE_COLOR", value: color.display })
      ActionCable.server.broadcast("chatting", { type: "NEW_COLORS", value: Color.all.map{|c| [c.id, c.active, c.display]} })
    end
    if action["type"] == "CHANGE_COLORS"
      Color.destroy_all
      Color.create_some_colors
      color = Color.find_by_active(true)
      ActionCable.server.broadcast("chatting", { type: "ACTIVATE_COLOR", value: color.display })
      ActionCable.server.broadcast("chatting", { type: "NEW_COLORS", value: Color.all.map{|c| [c.id, c.active, c.display]} })
    end
  end
  
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
