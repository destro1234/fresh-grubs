import React, { useContext} from 'react'
import {UserContext} from '../context/user.js'
import OrderCard from './OrderCard.js'


function OrdersLog() {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    return (
        <div>
            <h1>These are your orders!</h1>
            {currentUser.orders.map((order) => {
                return (
                    <OrderCard order={order}/>
                )
            })}
        </div>
    )
}

export default OrdersLog;