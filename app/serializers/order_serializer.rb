class OrderSerializer < ActiveModel::Serializer
  attributes :address, :customer, :total, :user, :items, :test

  def test
    object.items.collect {|i| {
        name: i.name,
        price: i.price,
        # game_description: "#{p.game.home_team} vs. #{p.game.away_team}",
        # prediction: p

      }
  
  }
  end
end
