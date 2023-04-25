import React, { useContext} from 'react'
import {UserContext} from '../context/user.js'
import OrderCard from './OrderCard.js'


function OrdersLog() {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const {newOrderItems, setNewOrderItems} = useContext(UserContext)

   

    return (
        <div>
            {/* <h1>These are your orders!</h1> */}
            {/* {console.log(currentUser.orders)} */}
            {currentUser.orders.map((order) => {
                // console.log(order.order_items)
                return (
                    <OrderCard order={order} newOrderItems={newOrderItems}/>
                )
            })}
        </div>
    )
}

export default OrdersLog;