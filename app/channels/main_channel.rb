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

  # def broadcast_to_player(action_type, **data)
  #   PrivateChannel.broadcast_to current_player, { type: action_type }.merge(data)
  # end
  #
  # def broadcast(action_type, **data)
  #   self.class.broadcast_to current_player.game, { type: action_type }.merge(data)
  # end
  #
  # def refresh_channel
  #   broadcast_to_player(
  #     "CABLECAR_CHANGE_CHANNEL",
  #     previousChannel: "GameChannel",
  #     newChannel: "GameChannel"
  #   )
  # end
  #
  # def refresh_list
  #   broadcast_to_player("GAME_LIST", {
  #     your_position: current_player.position,
  #     in_progress: Game.where(game_over: false).includes(:players).map do |game|
  #       game.attributes.merge({ players: game.players.map(&:attributes)})
  #     end
  #   })
  # end
  #
  # def refresh_list_for_everyone
  #   self.class.broadcast "game", {
  #     type: "GAME_LIST",
  #     your_position: current_player.position,
  #     in_progress: Game.where(game_over: false).includes(:players).map do |game|
  #       game.attributes.merge({ players: game.players.map(&:attributes)})
  #     end
  #   }
  # end
  #
  # def receive(action)
  #   logger.info "CABLECAR ACTION: #{action['type']}"
  #
  #   case action["type"]
  #
  #   when "JOIN_GAME"
  #     game = Game.find(action["value"])
  #     if current_player.join_game(game)
  #       refresh_channel
  #       refresh_list
  #       refresh_list_for_everyone
  #     else
  #       broadcast_to_player "TOO_MANY_PLAYERS"
  #     end
  #
  #   when "CREATE_GAME"
  #     current_player.update_attributes(game: Game.create(name: action["name"]), position: 1)
  #     refresh_channel
  #     refresh_list
  #     refresh_list_for_everyone
  #
  #   when "MOVE"
  #     current_player.move(action["value"])
  #     update_game
  #
  #   when "GAME_MSG"
  #     broadcast("GAME_MSG", value: action["value"])
  #
  #   when "GET_GAME_STATE"
  #     update_game
  #
  #   when "CHANGE_BG_COLOR"
  #     broadcast("CHANGE_BGCOLOR", value: "rgb(#{rand(255)},#{rand(255)},#{rand(255)})")
  #   end
  # end
  #
  # def update_game
  #   broadcast("UPDATE_GAME",
  #     name: current_player.game.name,
  #     turn: current_player.game.current_game.turn,
  #     value: current_player.game.current_game.current_state
  #   )
  # end
  #
  # def unsubscribed
  #   current_player.offline!
  # end

end
