class OrdersController < ApplicationController
    

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    
        def index
            if params[:user_id]
                user = User.find_by(id: params[:user_id])
                
                orders = user.orders
            else
                orders = Order.all
            end
            
            render json: orders
        end
    
        def create
            order = Order.create!(order_params)
            
            render json: order, include: order_items
        rescue ActiveRecord::RecordInvalid => e
            render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
        end
    
        def show
            user = User.find(params[:user_id])
            order = Order.find(params[:id])
            if order.user == user
            render json: order, include: order_items
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
            render json: order, include: order_items
        end
    
        private
    
        def order_params
            params.permit(:id, :address, :customer, :total, :user_id, :order, :order_items[:order_id, :item_id, :quantity], :user)
        end
    
        def record_not_found(exception)
            render json: { error: exception.record.errors.full_messages }, status: :not_found
    
        end
    
        def render_unprocessable_entity(exception)
            render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
            
        end
    end
    
