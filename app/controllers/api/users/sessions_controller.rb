class Api::Users::SessionsController < Devise::SessionsController
  respond_to :json
end
