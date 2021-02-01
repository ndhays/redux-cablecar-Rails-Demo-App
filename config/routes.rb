Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#home'
  get "/main", to: "home#main"
  post "/login", to: "home#login"
  get "/logout", to: "home#logout"
end
