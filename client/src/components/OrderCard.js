import React, {useContext} from 'react'
import {UserContext} from '../context/user.js'


function OrderCard({order}) {

    const { currentUser, setCurrentUser } = useContext(UserContext)

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


    // function handleDelete(event, prediction) {
    //     console.log(prediction)
    //     fetch(`users/${currentUser.id}/predictions/${prediction.id}`, {
    //         method: 'DELETE',
    //     })
    //     .then( r => r.json())
    //     .then( data => {
    //         deletePrediction(prediction)})

    // }

    return (
        <div>

            {console.log(order)}

            <h2>{order.customer}</h2>
            <h2>{order.address}</h2>
            

            <label>Total:</label>
            <h2>{order.total}</h2>

            <button>Change Order</button>
            <button onClick={handleDelete}>Cancel Order</button>

        </div>
    )
}

export default OrderCard;