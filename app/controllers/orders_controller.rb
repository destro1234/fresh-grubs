class OrdersController < ApplicationController
    

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    
        def index
    
            if params[:user_id]
                user = User.find_by(id: params[:user_id])
                binding.pry
                orders = user.orders
                
            else
                orders = Order.all
            end
            
            render json: orders
        end
    
        def create
            order = Order.create!(address: params[:address], customer: params[:customer], total: params[:total], user_id: params[:user_id])
            orderItems = params[:order_items]
            new_order_items = orderItems.map { |item|
            order.order_items.create(item.permit(:name, :price, :quantity, :item_id))
          }
        
            
            render json: order
        rescue ActiveRecord::RecordInvalid => e
            render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
        end
    
        def show
            user = User.find(session[:user_id])
            order = Order.find(params[:id])
            if order.user == user
            render json: order
            end
        end
    
    
        def destroy
            user = User.find(session[:user_id])
    
            order = Order.find(params[:id])
            order.destroy if order.user == user
            render json:{}
            
        end
    
        def update
            user = User.find(session[:user_id])
    
            order = Order.find_by(id: params[:id])
            order.update(order_params) if order.user == user
            render json: order
        end
    
        private
    
        def order_params
            params.permit(:id, :address, :customer, :total, :user_id, order_items: [:name, :price, :quantity, :item_id])
        end
    
        def record_not_found(exception)
            render json: { error: exception.record.errors.full_messages }, status: :not_found
    
        end
    
        def render_unprocessable_entity(exception)
            render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
            
        end
    end
    
