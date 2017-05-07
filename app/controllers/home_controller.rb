class HomeController < ApplicationController
  
  def index
    @message = Message.first || Message.create(message: "Newly created message.")
    Color.create_some_colors if Color.count == 0
    @colors = Color.all
  end
  
end
