class Color < ApplicationRecord

  def self.create_some_colors
    self.destroy_all
    20.times do |i|
      Color.create({ r: rand(255), g: rand(255), b: rand(255), opacity: 100, active: false })
    end
    color = Color.all.sample
    color.active = true
    color.save
  end
  
  def display
    "rgba(#{r},#{g},#{b},#{opacity/100.0})"
  end
  
end
