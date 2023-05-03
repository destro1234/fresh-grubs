class OrderSerializer < ActiveModel::Serializer
   attributes :id, :address, :customer, :total, :order_items
    # has_many :order_items

  


end

