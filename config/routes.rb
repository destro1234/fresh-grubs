Rails.application.routes.draw do
  
  get 'items/create'
  get 'items/show'
  get 'items/index'
  get 'items/destroy'
  get 'items/update'
  get 'sessions/create'
  get 'users/show'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :users
  resources :items
  resources :orders


  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete '/logout', to: "sessions#delete"
end
