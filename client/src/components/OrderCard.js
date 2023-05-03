import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../context/user.js'
import EditOrderForm from './EditOrderForm.js'



function OrderCard({order }) {

    
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const { currentOrder, setCurrentOrder} = useContext(UserContext)
    const {newOrderItems, setNewOrderItems } = useContext(UserContext)
    const [ editClicked, setEditClicked] = useState(false)

    console.log(order)
    
    function handleDelete(event) {
        
        fetch(`users/${currentUser.id}/orders/${order.id}`, {
                    method: 'DELETE',
                })
                .then ( r => r.json())
                .then( data => {
                    deleteOrder(data)
                })

    }

    function deleteOrder(o) {
    
        const newOrders = currentUser.orders.filter((order) => order.id !== o.id);
        console.log(newOrders)
        
        const newUser = { ...currentUser, orders: newOrders };
    
        setCurrentUser(newUser)
    }

    function editOrder(data) {
        
        let filteredOrders = currentUser.orders.filter( (o) => o.id !== order.id )

    
        let editedOrders = [...filteredOrders, data]
        currentUser.order = {editedOrders}

        
        const newUser = {...currentUser}
        setCurrentUser(newUser)
        
        showEditForm()
    }

    

   

    function showEditForm() {
        setEditClicked(!editClicked)
        setCurrentOrder(order)
    }

    return (
        <div>
            <h2>{order.customer}</h2>
            <h2>{order.address}</h2>

            

            <ol key={order.id}>
            { order.order_items ? order.order_items.map((oi, index) => {
            
            if (oi) {
                console.log(oi)
                const itemTotalPrice = oi.price * oi.quantity;

                return (
                    
                        <li>
                            <div>{oi.name} - ${oi.price}</div>
                            <div></div>
                            <div>Quantity: {oi.quantity} </div>
                            <div>Total Price: ${itemTotalPrice}</div>
                        </li>
            
        ) 
        
    }
}): null}

</ol>
            

            
            <h2>Total: ${order.total}</h2>

            <button onClick={showEditForm}>Change Order</button>
            <button onClick={handleDelete}>Cancel Order</button>

            { editClicked ? <EditOrderForm order={order} editOrder={editOrder} /> : null }

        </div>
    )
}

export default OrderCard;