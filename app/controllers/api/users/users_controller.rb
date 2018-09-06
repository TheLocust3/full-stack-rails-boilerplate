class Api::Users::UsersController < ApplicationController
  def index
    render :json => current_user
  end
end
