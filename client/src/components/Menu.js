import React, {useContext, useState, useEffect} from 'react'
import Login from './Login.js'
import OrderForm from './OrderForm.js'
import {UserContext} from '../context/user.js'


function Menu () {

    const [items, setItems] = useState([])
    const [address, setAddress] = useState(null)
    const [customer, setCustomer] = useState(null)
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        fetch('/items')
        .then( res => res.json())
        .then( data => setItems(data))
    }, [])


    function viewOrder(event) {
        

    }

    function handleClick () {
        setClicked(!clicked)
      }
      
      function addOrder (order) {
        
        let newUser = {...currentUser}
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

            <button onClick={handleClick}>Start new order!</button>

            <button>View current order!</button>

            { clicked ?  <OrderForm addOrder={addOrder} /> : null}
        </div>
    )
}

export default Menu;