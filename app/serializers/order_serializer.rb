class OrderSerializer < ActiveModel::Serializer
   attributes :id, :address, :customer, :order_items

   def test
    object.order_items.collect {|oi| {
        order: oi.order_id,
        item: oi.item_id,
        quantity: oi.quantity
      }
  
  }
  end

  


end

