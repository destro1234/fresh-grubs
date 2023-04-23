import React, {useState, useContext} from 'react'
import {UserContext} from '../context/user.js'
import EditOrderForm from './EditOrderForm.js'



function OrderCard({order}) {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [ editClicked, setEditClicked] = useState(false)
    const [winner, setWinner] = useState("")
    const [reason, setReason] = useState("")


    function handleDelete(event) {
        console.log(event)
        console.log(order)
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
        console.log(filteredOrders)
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
    }

    // function handleUpdate (event) {
    //     event.preventDefault()
    //     fetch(`users/${currentUser.id}/predictions/${test.prediction.id}`, {
    //         method: "PATCH",
    //         headers: { "Content-Type" : "application/json"},
    //         body: (JSON.stringify({
    //             winner: winner,
    //             reason: reason
                
    //         })),
    //     })
    //     .then( r => r.json())
    //     .then( data => editPrediction(data, showForm))
    // }

    return (
        <div>

            {console.log(order)}

            <h2>{order.customer}</h2>
            <h2>{order.address}</h2>
            

            <label>Total:</label>
            <h2>{order.total}</h2>

            <button onClick={showEditForm}>Change Order</button>
            <button onClick={handleDelete}>Cancel Order</button>

            { editClicked ? <EditOrderForm order={order} editOrder={editOrder} /> : null }

        </div>
    )
}

export default OrderCard;