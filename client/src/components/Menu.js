import React, {useContext, useState, useEffect} from 'react'
import OrderForm from './OrderForm.js'
import {UserContext} from '../context/user.js'
import OrderCard from './OrderCard.js'


function Menu () {

    const [items, setItems] = useState([])
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const {newOrderItems, setNewOrderItems} = useContext(UserContext)
    const [clicked, setClicked] = useState(false)
    const {currentOrder, setCurrentOrder} = useContext(UserContext)


    useEffect(() => {
        fetch('/items')
        .then( res => res.json())
        .then( data => setItems(data))
    }, [])

    function handleClick () {
        setClicked(!clicked)
        if (!clicked) {
            setNewOrderItems([])
        }

      }
      
      

    

    function handleAddItem (event, item_id) {
        
        if (clicked) {
            let item = items.find( i => i.id === item_id) 
            let newOrderItem = {name: item.name, price: item.price, order_id: null, item_id: item_id, quantity: 1}
            

            const uniqueItemNames = [...new Set(newOrderItems.map(i => i.name))];

            if (!uniqueItemNames.includes(newOrderItem.name)) {

            setNewOrderItems([...newOrderItems, newOrderItem])
        }
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
                    <button onClick={(event) => handleAddItem(event, item.id )}>Add to order</button>
                    </React.Fragment>
                
                )
               })}

            </ol>

            <button onClick={handleClick}>Start new order!</button>

            { clicked ?  <OrderForm setClicked={setClicked}/> : null}
            {console.log(currentUser.orders)}
            {Object.keys(currentOrder).length !== 0 ? 
                <div>  
                <h1>This is your current order: </h1>
                {console.log(currentOrder)}
                <OrderCard order={currentOrder}/>
                </div>
            
            : null}
            
        </div>
    )
}

export default Menu;