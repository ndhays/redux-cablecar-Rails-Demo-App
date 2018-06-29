class MainChannel < ApplicationCable::Channel

  def subscribed
    stream_from "private___#{current_user}"
    stream_from "main"
  end

  def receive(action)
    logger.info "CABLECAR ACTION: #{action['type']}"

    case action["type"]

    when "GET_RECENT_MSGS"
      logger.info "CABLECAR ACTION: GET_RECENT_MSGS"
      broadcast_to_current_user({ type: "RECENT_MSGS", msgs: Message.recent })

    when "NEW_MSG"
      logger.info "CABLECAR ACTION: NEW MSG: #{action['msg']}"
      msg = Message.create(name: current_user, msg: action['msg'])
      rebroadcast(action.merge(msg.info))
    end
  end

  def rebroadcast(action)
    ActionCable.server.broadcast("main", action)
  end

  def broadcast_to_current_user(action)
    ActionCable.server.broadcast("private___#{current_user}", action)
  end

  def clear_all_messages
    Message.where(name: current_user).destroy_all
    ActionCable.server.broadcast("main", { type: "RECENT_MSGS", msgs: Message.recent })
  end

end
