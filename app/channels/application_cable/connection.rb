module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_player
 
    def connect
      self.current_player = find_verified_user
    end
 
    private
      def find_verified_user
        if found_player = Player.find_by(id: cookies.signed[:player_id])
          found_player
        else
          new_player = Player.create(color: "rgb(#{rand(255)},#{rand(255)},#{rand(255)})")
          cookies.signed[:player_id] = new_player.id
          new_player
        end
      end
  end
end
