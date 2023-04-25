import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../context/user.js'
import EditOrderForm from './EditOrderForm.js'
import ItemCard from './ItemCard.js'



function OrderCard({order }) {

    
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const { currentOrder, setCurrentOrder} = useContext(UserContext)
    const {newOrderItems, setNewOrderItems } = useContext(UserContext)
    const [ editClicked, setEditClicked] = useState(false)
    const [winner, setWinner] = useState("")
    const [reason, setReason] = useState("")
    console.log(currentOrder)

    
    

    useEffect(() => {
        let updatedOrderItems = newOrderItems.map(item => {
            return {
                ...item,
                order_id: order.id
            };
        }
            )
            console.log(updatedOrderItems)

        fetch(`users/${currentUser.id}/orders/${order.id}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                
                    order_items: [
                        {order_id: 1,
                         items_id: 1,
                         quantity: 1
                        }
                    ]
            }
                )
            
        }).then(res => res.json())
        .then(data => {console.log(data)})
    }, [newOrderItems, setNewOrderItems])

    console.log(currentUser)


    function handleDelete(event) {
        
        fetch(`users/${currentUser.id}/orders/${order.id}`, {
                    method: 'DELETE',
                })
                .then ( r => r.json())
                .then( data => {
                    deleteOrder(order)
                })

    }

    function deleteOrder(o) {
    
        let orderIndx = currentUser.orders.findIndex((order) => { return order.id === o.id})
        // let testIndx = currentUser.test.findIndex((test) => { return test.prediction === p})
        
        currentUser.orders.splice(orderIndx, 1)
        // currentUser.test.splice(testIndx, 1)
        const newUser = {...currentUser}
        setCurrentUser(newUser)
    }

    function editOrder(data) {
        
        let filteredOrders = currentUser.orders.filter( (o) => o.id !== order.id )

        // let filteredTest = currentUser.test.filter((test) => { return test.prediction.id !== p.id })
        // let editedTest = {winner: p.winner, reason: p.reason, game_description: `${p.game.home_team} vs. ${p.game.away_team}`, prediction: p}

    
        currentUser.orders = [...filteredOrders, data]
        // currentUser.test = [...filteredTest, editedTest ]

        
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

            
             { 
            order.order_items ? order.order_items.map((oi) => {
                // console.log(oi)
                return (
                    <h1>this is the item card</h1>
                    // <ItemCard test={oi} />
                )
            }) : null 
            }
            

            <label>Total:</label>
            <h2>{order.total}</h2>

            <button onClick={showEditForm}>Change Order</button>
            <button onClick={handleDelete}>Cancel Order</button>

            { editClicked ? <EditOrderForm order={order} editOrder={editOrder} /> : null }

        </div>
    )
}

export default OrderCard;