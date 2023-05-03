class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :quantity, :order_id, :item_id, :item, :item_name, :item_price

end
