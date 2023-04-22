import React, {useContext, useState, useEffect} from 'react'
import Login from './Login.js'
import {UserContext} from '../context/user.js'


function Menu () {

    const [items, setItems] = useState([])
    const { currentUser, setCurrentUser } = useContext(UserContext)

    useEffect(() => {
        fetch('/items')
        .then( res => res.json())
        .then( data => setItems(data))
    }, [])

    console.log(items)

    function viewOrder(event) {
        console.log(event)

    }

    function handleAddItem(event) {
        console.log(event)

    }

    function handleNewOrder(event) {
        console.log(event)
        fetch("/orders", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({total: 0, user_id: currentUser.id})
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }



    return (
        <div>
            <h1>Jesus Tacos</h1>
            <br></br>
                <h2>Menu</h2>
            <ol>
               { items.map((item) => {
                return (
                    <React.Fragment><li>{item.name} - ${item.price} </li>
                    <button onClick={handleAddItem}>Add to order</button>
                    </React.Fragment>
                
                )
               })}

            </ol>

            <button onClick={handleNewOrder}>Start new order!</button>

            <button onClick={viewOrder}>View current order!</button>
        </div>
    )
}

export default Menu;