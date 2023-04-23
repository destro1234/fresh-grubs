import React, { useContext, useState } from 'react'
import {UserContext} from '../context/user.js'

function OrderFrom ({addOrder}) {

    const [address, setAddress] = useState(null)
    const [customer, setCustomer] = useState(null)
    const { errors, setErrors } = useContext(UserContext)
    const {currentUser, setCurrentUser} = useContext(UserContext)


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
            body: JSON.stringify({address: address, customer: customer, total: 0, user_id: currentUser.id})
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
            <form>
            <h3> New Order: </h3>
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
            <button onClick={handleNewOrder} type="submit">Submit</button>
          </form>
        </div>
    )
    }

export default OrderFrom;