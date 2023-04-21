class ItemsController < ApplicationController
  def create
  end

  def show
  end

  def index
    items = Item.all
    render json: items
  end

  def destroy
  end

  def update
  end
end
