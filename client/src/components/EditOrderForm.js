import React, { useState, useContext } from 'react'
import {UserContext} from '../context/user.js'


function EditOrderForm({order, editOrder}) {

    const {currentUser, setCurrentUser} = useContext(UserContext)
    const {newOrderItems, setNewOrderItems} = useContext(UserContext)

    const [address, setAddress] = useState([])
    const [customer, setCustomer] = useState("")
    const [total, setTotal] = useState(0)


    function changeAddress (event) {
        setAddress(event.target.value)
    }

    function changeCustomer (event) {
        setCustomer(event.target.value)
    }

    function changeTotal (event) {
        setTotal(event.target.value)
    }
    function handleAddQuantity(index) {
        const newOrderItemsCopy = [...newOrderItems];
        newOrderItemsCopy[index].quantity++;
        setNewOrderItems(newOrderItemsCopy);

      }
      function handleRemoveQuantity(index) {
        const newOrderItemsCopy = [...newOrderItems];
        if (newOrderItemsCopy[index].quantity > 1) {
          newOrderItemsCopy[index].quantity--;
        } else {
          newOrderItemsCopy.splice(index, 1); // remove item from array
        }
        setNewOrderItems(newOrderItemsCopy);
      }

    function handleUpdate (event) {
        event.preventDefault()

                fetch(`users/${currentUser.id}/orders/${order.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type" : "application/json"},
                    body: (JSON.stringify({
                                address: address,
                                customer: customer,
                                
                
                            })),
                        })
                        .then( r => r.json())
                        .then( data => editOrder(data))

    }

    return (
        <div>
         
         <h3> This is your order: </h3>
         

            { newOrderItems.map((oi, index) => {
                if (oi) {
                    const itemTotalPrice = oi.price * oi.quantity;

                    return (
                        <ul key={index}>
                        <li>
                            <div>{oi.name} - ${oi.price}</div>
                            <div></div>
                            <div>Quantity: {oi.quantity} </div><button onClick={()=>handleAddQuantity(index)}>Add item</button><button onClick={()=>handleRemoveQuantity(index)}>Remove item</button>
                            <div>Total Price: ${itemTotalPrice}</div>

                            
                            </li>
                        
                        </ul>
                    ) 
                }
                
                
            })}
            <form>
            <h3>Edit your order</h3>
            <label>Change Address: </label>
            <br></br>
            <input onChange={changeAddress} type="text" placeholder="Address"></input>
            <br></br>
            <label> Change Customer: </label>
            <br></br>
            <input onChange={changeCustomer} type="text" placeholder="customer"></input>
  
            {/* {errors.length > 0 && (
              <ul style={{ color: "red" }}>
                  {errors.map((error) => (
              <li key={error}>{error}</li>
                  ))}
              </ul>
            )} */}
            <button onClick={handleUpdate} type="submit">Submit</button>
          </form>

        </div>
    )
}

export default EditOrderForm;