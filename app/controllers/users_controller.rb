class UsersController < ApplicationController
  def create
    
    user = User.create!(user_params)
    render json: user
  end

   def show
        user = User.find_by(id: session[:user_id])

        render json: user
    end

  private

  def user_params
    params.permit(:username, :password)
  end
end
