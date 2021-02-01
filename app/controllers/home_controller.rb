class HomeController < ApplicationController

    def home
    end
  
    def main
      @name = cookies.signed[:name]
    end
  
    def login
      cookies.signed[:name] = params[:name]
      redirect_to :main
    end
  
    def logout
      cookies.signed[:name] = nil
      redirect_to :root
    end
  
  end
  