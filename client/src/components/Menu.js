import React, {useContext, useState, useEffect} from 'react'
import Login from './Login.js'
import {UserContext} from '../context/user.js'


function Menu () {

    const [items, setItems] = useState([])
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const { errors, setErrors } = useContext(UserContext)

    useEffect(() => {
        fetch('/items')
        .then( res => res.json())
        .then( data => setItems(data))
    }, [])

    console.log(items)

    function viewOrder(event) {
        console.log(event)

    }

    function addOrder (order) {
        console.log(order)
        
        let newUser = {...currentUser}
        
        console.log(currentUser.orders)
    //     // let newTest = {winner: prediction.winner, reason: prediction.reason, game_description: `${prediction.game.home_team} vs. ${prediction.game.away_team}`, prediction: prediction}
       if (currentUser.orders) {
        newUser.orders = [...currentUser.orders, order]
    //     // newUser.test = [...currentUser.test, newTest]
       }

       else {
            newUser.orders = [order]
    //         // newUser.test = [newTest]
       }
       setCurrentUser(newUser)          
    }

    

    async function handleNewOrder(event) {
        
        event.preventDefault()

        const response = await fetch(`users/${currentUser.id}/orders`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({total: 0, user_id: currentUser.id})
        })
         const data = await response.json();
        
            
            if (response.ok) {
               
                addOrder(data)
                // setClicked(!clicked)
                
            }

            else {
                setErrors(data.errors)
            }
            
        
        
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
                    <button>Add to order</button>
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