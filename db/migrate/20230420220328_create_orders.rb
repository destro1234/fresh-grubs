class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.string :address
      t.string :customer
      t.integer :total
      t.integer :user_id

      t.timestamps
    end
  end
end
