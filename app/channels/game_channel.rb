class GameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find_by(id: params[:game_id]) || Game.create(id: params[:game_id])
    current_player.join_game(@game)
    stream_from params[:game_id]
  end

  def receive(action)
    puts "ACTION... #{action['type']}"
    if action["type"] == "CONNECT_TO_GAME"
      ActionCable.server.broadcast(@game.id, { type: "CONNECTED_TO_GAME", value: current_player.id })
      @game.players.each do |player|
        ActionCable.server.broadcast(@game.id, { type: "ADD_PLAYER", value: player })
      end
    end
    if action["type"] == "MOVE_UP"
      changed = current_player.change_position([0,-1])
      update_player if changed
    end
    if action["type"] == "MOVE_RIGHT"
      changed = current_player.change_position([1,0])
      update_player if changed
    end
    if action["type"] == "MOVE_LEFT"
      changed = current_player.change_position([-1,0])
      update_player if changed
    end
    if action["type"] == "MOVE_DOWN"
      changed = current_player.change_position([0,1])
      update_player if changed
    end
    
    if action["type"] == "CHANGE_BG_COLOR"
      ActionCable.server.broadcast(@game.id, { type: "CHANGE_BGCOLOR", value: "rgb(#{rand(255)},#{rand(255)},#{rand(255)})" })
    end
  end
  
  def update_player
    ActionCable.server.broadcast(@game.id, { type: "UPDATE_PLAYER", value: current_player })
  end
  
  def unsubscribed
    ActionCable.server.broadcast(@game.id, { type: "REMOVE_PLAYER", value: current_player.id })
    current_player.game_id = nil
    current_player.save
    # Any cleanup needed when channel is unsubscribed
  end
end
