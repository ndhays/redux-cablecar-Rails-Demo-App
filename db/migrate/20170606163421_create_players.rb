class CreatePlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :game_id
      t.integer :position_x
      t.integer :position_y
      t.string :color
      t.timestamps
    end
  end
end
