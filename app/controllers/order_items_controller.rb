class OrderItemsController < ApplicationController

    def index
        user = User.find(session[:user_id])

        if params[:order_id]
            order = user.orders.find_by(id: params[:order_id])
            order_items = order&.order_items || []
            order_items = order.order_items
        else
            order_items = OrderItem.all
        end
        binding.pry
        render json: order_items
    end

    def show
        user = User.find(session[:user_id])
        order_item = user.order_items.find_by(id: params[:id])
        if order_item
            render json: order_item, include: [:order, :item]
          else
            render json: { error: 'Order item not found' }, status: :not_found
          end
        end

    def create
        user = User.find(session[:user_id])

        order_item = user.order_items.create(order_item_params)
        render json: order_item

    end

    

    private

    def order_item_params
        params.permit(:name, :price, :order_id, :item_id, :quantity)
    end
end
