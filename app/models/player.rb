class Player < ApplicationRecord

  belongs_to :game, optional: true

  def join_game(game)
    position = [5,5]
    current_positions = game.players.pluck(:position_x, :position_y)
    until (!current_positions.include?(position)) do
      position = [rand(10), rand(10)]
    end
    self.game_id = game.id
    self.position_x = position[0]
    self.position_y = position[1]
    self.save
  end
  
  def change_position(deltas)
    new_position = [self.position_x + deltas[0], self.position_y + deltas[1]]
    on_board = new_position[0] >= 0 && new_position[0] <= 10 && new_position[1] >= 0 && new_position[1] <= 10
    if on_board
      current_positions = self.game.players.pluck(:position_x, :position_y)
      if !current_positions.include?(new_position)
        self.position_x = new_position[0]
        self.position_y = new_position[1]
        self.save
        return true
      end
    end
    
    return false
  end

end
