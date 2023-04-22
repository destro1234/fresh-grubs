class OrderSerializer < ActiveModel::Serializer
  attributes :total, :user, :items
end
