import React from 'react'

function ItemCard ({test}) {
    return (
        <div>
            Im the item Card
            <li>{test.item.name}</li>
        </div>
    )
}

export default ItemCard;