class UserSerializer < ActiveModel::Serializer
  attributes :username, :orders, :test
end
