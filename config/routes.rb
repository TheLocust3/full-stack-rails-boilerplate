Rails.application.routes.draw do
  devise_for :users, skip: [ :sessions, :registrations, :passwords ]

  root to: 'root#index'

  namespace :api do
    namespace :users do
      devise_scope :user do
        post 'sign_in'  => 'sessions#create', as: :new_user_session
        delete 'sign_out' => 'sessions#destroy', as: :destroy_user_session

        post '' => 'registrations#create'
        patch '' => 'registrations#update'

        post 'password' => 'passwords#create'
        patch 'password' => 'passwords#update', as: :user_password
        get 'password/edit' => 'root#index', as: :edit_user_password
      end

      get '' => 'users#index'
    end
  end

  get '*path', to: 'root#index'
end
