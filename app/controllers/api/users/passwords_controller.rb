class Api::Users::PasswordsController < Devise::PasswordsController
  respond_to :json
end
