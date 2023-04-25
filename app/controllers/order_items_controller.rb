class OrderItemsController < ApplicationController

    def index
        if params[:order_id]
            order = Order.find_by(id: params[:order_id])
            item = Item.find_by(id: params[:item_id])
            order_items = order.order_items
        else
            order_items = OrderItem.all
        end
        
        render json: order_items, include: [:order, :item]
    end

    def show
        user = User.find(session[:user_id])

        order_item= OrderItem.find(params[:order_item_id])
        if order_item.order.user == user
        render json: order_item, include: [:order, :item]
        end
    end

    def create
        order_item = OrderItem.create(order_item_params)
        render json: order_item

    end

    

    private

    def order_item_params
        params.permit(:order_id, :item_id, :quantity, :order_item)
    end
end
