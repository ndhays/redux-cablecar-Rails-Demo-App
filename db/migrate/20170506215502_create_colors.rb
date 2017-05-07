class CreateColors < ActiveRecord::Migration[5.0]
  def change
    create_table :colors do |t|
      t.integer :r
      t.integer :g
      t.integer :b
      t.integer :opacity
      t.boolean :active
      t.timestamps
    end
  end
end
