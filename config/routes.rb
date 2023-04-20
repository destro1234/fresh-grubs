Rails.application.routes.draw do
  
  get 'users/show'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :user


  post "/login", to: "users#show"
end
