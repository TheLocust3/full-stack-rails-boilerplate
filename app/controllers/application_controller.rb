class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?
  respond_to :json

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :password_confirmation, :name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:email, :password, :password_confirmation, :name])
  end

  def render_success
    render :json => { 'status': 'ok' }
  end

  def render_error(error)
    render :json => { 'errors': { error: [error] } }, :status => 400
  end

  def render_errors(model)
    render :json => { 'errors': model.errors.messages }, :status => 400
  end

  def not_found
    render :json => {}, :status => 404
  end
end
