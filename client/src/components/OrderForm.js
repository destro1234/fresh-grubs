import React, { useEffect, useContext, useState } from 'react'
import {UserContext} from '../context/user.js'

function OrderForm ({ addOrder }) {

    const [address, setAddress] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [orderTotal, setOrderTotal ] = useState(0)
    const { errors, setErrors } = useContext(UserContext)
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const {currentOrder, setCurrentOrder} = useContext(UserContext)
    const { newOrderItems, setNewOrderItems } = useContext(UserContext)

    function handleAddressChange(event) {
        setAddress(event.target.value)
      }

      function handleCustomerChange(event) {
        setCustomer(event.target.value)
      }

      async function handleNewOrder(event) {
        
        event.preventDefault()

        const response = await fetch(`users/${currentUser.id}/orders`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({address: address, customer: customer, total: orderTotal, user_id: currentUser.id, order_items: newOrderItems})
        })
         const data = await response.json();
        
            
            if (response.ok) {
                
                addOrder(data)

                
            }

            else {
                console.log(data)
                setErrors(data.errors)
            }
            
        
        
    }

    function handleAddQuantity(index) {
        const newOrderItemsCopy = [...newOrderItems];
        newOrderItemsCopy[index].quantity++;
        setNewOrderItems(newOrderItemsCopy);

      }

   
    
    function handleRemoveQuantity(index) {
        
        const newOrderItemsCopy = [...newOrderItems];
        if (newOrderItemsCopy[index].quantity > 0) {
            newOrderItemsCopy[index].quantity--;
          } else {
            return;
          }
        
        setNewOrderItems(newOrderItemsCopy);

      }

      useEffect(() => {
          const orderPrice = newOrderItems.reduce((total, oi) => {
            if (oi) {
              const itemTotalPrice = oi.price * oi.quantity;
              return total + itemTotalPrice;
            }
            return total;
          }, 0);
          setOrderTotal(orderPrice);
      }, [newOrderItems]);


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

            <div>Order Total: ${orderTotal}</div>



            <form>
            <label>Address: </label>
            <br></br>
            <input onChange={handleAddressChange} type="text" placeholder="Address"></input>
            <br></br>
            <label> Customer: </label>
            <br></br>
            <input onChange={handleCustomerChange} type="text" placeholder="customer"></input>
  
            {console.log(errors)}
            {errors.length > 0 && (
              <ul style={{ color: "red" }}>
                  {errors.map((error) => (
              <li key={error}>{error}</li>
                  ))}
              </ul>
            )}
            <button onClick={handleNewOrder} type="submit">Submit</button>
          </form>
        </div>
    )
    }

export default OrderForm;