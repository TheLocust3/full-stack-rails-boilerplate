Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations', passwords: 'users/passwords' }

  root to: 'root#index'

  namespace :api do
    resources :users do
      collection do
        get ':id/events' => 'users#get_events'
      end
    end
  end

  get '*path', to: 'root#index'
end
