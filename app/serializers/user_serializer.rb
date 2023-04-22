class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :orders
end
