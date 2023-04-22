class OrdersController < ApplicationController

    def create
        order = Order.create!(order_params)
        render json: order, status: :created
    end

    def show
        user = User.find(session[:user_id])

        order = Order.find(params[:id])
        if order.user == user
        render json: order, include: :items
        end
    end

    private
    
    def order_params
        params.permit(:total, :user_id)
    end
end
