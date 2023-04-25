import React, {useContext, useState, useEffect} from 'react'
import Login from './Login.js'
import OrderForm from './OrderForm.js'
import {UserContext} from '../context/user.js'


function Menu () {

    const [items, setItems] = useState([])
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const {currentOrder, setCurrentOrder} = useContext(UserContext)
    const {newOrderItems, setNewOrderItems} = useContext(UserContext)
    const [clicked, setClicked] = useState(false)
    const {errors, setErrors } = useState({})

    useEffect(() => {
        fetch('/items')
        .then( res => res.json())
        .then( data => setItems(data))
    }, [])

    function handleClick () {
        setClicked(!clicked)

      }
      
      function addOrder (order) {
        
        let newUser = {...currentUser}
       if (currentUser.orders) {
        newUser.orders = [...currentUser.orders, order]
       }

       else {
            newUser.orders = [order]
       }
       setCurrentUser(newUser)         
    }

    function addOrderItem(order_item) {
        console.log(order_item)
        // let newUser = {...currentUser}
        // let newOrder = {...currentOrder}
        // if (currentOrder.order_items) {
        //     newOrder.order_items = [...currentOrder.order_items, order_item ]
        //     newUser.orders = [...currentUser.orders, newOrder]

        // }

        // else {
        //     newOrder.order_items = [order_item]
        //     newUser.orders = [newOrder]
        // }
        // setCurrentUser(newUser)
    }

    function handleAddItem (event, item_id) {
        
        if (clicked) {
            let item = items.find( i => i.id === item_id) 
            let newOrderItem = {name: item.name, price: item.price, item_id: item_id, quantity: 1}
            console.log(newOrderItem)

            
            
            setNewOrderItems([...newOrderItems, newOrderItem])
        }

       
    
        // console.log(newOrderItems)
    }

    // async function handleAddItem(event, item_id) {

    //     const response = await fetch(`/order_items`, {
    //         method: "POST",
    //         headers: {"Content-Type" : "application/json"},
    //         body: JSON.stringify({order_id: currentOrder.id, item_id: item_id, quantity: 2})
    //     })
    //      const data = await response.json();
        
            
    //         if (response.ok) {
    //             addOrderItem(data)
    //         }

    //         else {
    //             setErrors(data.errors)
    //         }
            
        
        
    // }

    




    return (
        <div>
            <h1>Jesus Tacos</h1>
            <br></br>
                <h2>Menu</h2>
            <ol>
               { items.map((item) => {
                return (
                    <React.Fragment><li>{item.name} - ${item.price} </li>
                    <button onClick={(event) => handleAddItem(event, item.id )}>Add to order</button>
                    </React.Fragment>
                
                )
               })}

            </ol>

            <button onClick={handleClick}>Start new order!</button>

            { clicked ?  <OrderForm addOrder={addOrder} newOrderItems={newOrderItems} /> : null}
        </div>
    )
}

export default Menu;