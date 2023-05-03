import React, { useEffect, useContext, useState } from 'react'
import {UserContext} from '../context/user.js'

function OrderForm ({setClicked}) {

    const [address, setAddress] = useState("")
    const [customer, setCustomer] = useState("")
    const [orderTotal, setOrderTotal ] = useState(0)
    const { errors, setErrors } = useContext(UserContext)
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const { newOrderItems, setNewOrderItems } = useContext(UserContext)
    const {currentOrder, setCurrentOrder } = useContext(UserContext)


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
    

    

    function handleAddressChange(event) {
        setAddress(event.target.value)
      }

      function handleCustomerChange(event) {
        setCustomer(event.target.value)
      }

      async function handleNewOrder(event) {
        event.preventDefault()

        if (newOrderItems.some((item) => item.quantity === 0)) {
            setErrors(["Please remove items with 0 quantity"]);
            return;
          }

        const orderData = {
            address: address,
            customer: customer,
            total: orderTotal,
            user_id: currentUser.id,
            order_items: newOrderItems.filter( item => item.quantity > 0)
            .map(item => {
                return {
                  name: item.name,
                  price: item.price,
                  item_id: item.item_id,
                  quantity: item.quantity
                }
              })
        };

    
    
        const response = await fetch(`users/${currentUser.id}/orders`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(orderData)
        })

        const data = await response.json();

        if (response.ok) {
            setCurrentOrder(data)
            addOrder(data);
            setClicked(false)
            window.alert("Your order has been submitted!");

        } else {
            setErrors(data.errors)
        }
    }

    function addOrder(order) {
    
        console.log(order)
        let newUser = { ...currentUser };
        console.log(newUser)
        if (currentUser.orders) {
          const updatedOrders = [...currentUser.orders, order];

          newUser.orders = updatedOrders;
        } else {
          newUser.orders = [order];
        }
        setCurrentUser(newUser);
        
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



    return (
        <div>
         
         <h3> This is your order: </h3>
         
         <ol >
            { newOrderItems.map((oi, index) => {
                if (oi) {
                    const itemTotalPrice = oi.price * oi.quantity;

                    return (
                        
                        <li>
                            <div>{oi.name} - ${oi.price}</div>
                            <div></div>
                            <div>Quantity: {oi.quantity} </div><button onClick={()=>handleAddQuantity(index)}>Add item</button><button onClick={()=>handleRemoveQuantity(index)}>Remove item</button>
                            <div>Total Price: ${itemTotalPrice}</div>

                            
                            </li>
                        
                        
                    ) 
                    
                }
                
                
            })}
            </ol>

            <div>Order Total: ${orderTotal}</div>



            <form>
            <label>Address: </label>
            <br></br>
            <input onChange={handleAddressChange} type="text" placeholder="Address"></input>
            <br></br>
            <label> Customer: </label>
            <br></br>
            <input onChange={handleCustomerChange} type="text" placeholder="customer"></input>
  
            
            {errors.length > 0 && (
              <ul style={{ color: "red" }}>
                  {errors.map((error) => (
              <li key={error}>{error}</li>
                  ))}
              </ul>
            )}
            <button onClick={(event) => handleNewOrder(event)} type="submit">Submit</button>
          </form>
        </div>
    )
    }

export default OrderForm;