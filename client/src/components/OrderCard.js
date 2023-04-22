import React, {useContext} from 'react'
import {UserContext} from '../context/user.js'


function OrderCard({order}) {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    return (
        <div>
            <h3>{currentUser.username}'s </h3>

            {console.log(order.items)}

            <label for="total">Total:</label>
            <h2 name="total">{order.total}</h2>

            <button>Change Order</button>
            <button>Cancel Order</button>

        </div>
    )
}

export default OrderCard;