class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :msg
      t.string :name
      t.timestamps
    end
  end
end
