Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  root to: 'root#index'

  namespace :api do
    get '' => 'users#index'
  end

  get '*path', to: 'root#index'
end
