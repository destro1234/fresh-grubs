class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :order_items
  has_many :orders
end
