class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :order_id, :item_id, :item, :order

end
