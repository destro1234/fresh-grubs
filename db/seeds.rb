# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1= User.create(username: "destro", password_digest:"YODA")
user2= User.create(username: "Nat", password_digest: "Vent")
user3= User.create(username: "Chris", password_digest: "Christmas")

item1 = Item.create(name: "pork buns", price: 5.99)
item2 = Item.create(name: "scallion pancakes", price: 7.99)
item3 = Item.create(name: "boba tea", price: 10.99)
item4 = Item.create(name: "edamame", price: 5.99)
item5 = Item.create(name: "homemade ice tea", price: 6.99)
item6 = Item.create(name: "steamed pork dumplings", price: 15.99)

order1 = Order.create(total: 100, user_id: 1)
order2 = Order.create(total: 50, user_id: 1)
order3 = Order.create(total: 75, user_id: 2)
order4 = Order.create(total: 57.99, user_id: 2)
order5 = Order.create(total: 60, user_id: 3)
order6 = Order.create(total: 49.99, user_id: 3)

order_item1 = OrderItem.create(order_id: 1, item_id: 1, quantity: 2)
order_item2 = OrderItem.create(order_id: 1, item_id: 2, quantity: 1)
order_item3 = OrderItem.create(order_id: 1, item_id: 5, quantity: 1)

puts "Done seeding"