class OrdersController < ApplicationController

    def create
        order = Order.create!(order_params)
        render json: order, status: :created
    end

    private
    
    def order_params
        params.permit(:total, :user_id)
    end
end
