class Order < ApplicationRecord
    belongs_to :user
    has_many :order_items
    has_many :items, through: :order_items

    validates :address, presence: true
    validates :customer, presence: true
    validates :total, presence: true

    
    
end
