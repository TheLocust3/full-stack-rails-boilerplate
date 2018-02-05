Rails.application.routes.draw do
  root to: 'root#index'

  get '*path', to: 'root#index'
  get '*path', to: 'root#index'
end
