import React, { useState, useContext } from 'react'
import {UserContext} from '../context/user.js'


function EditOrderForm({order, editOrder}) {

    const {currentUser, setCurrentUser} = useContext(UserContext)

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

    function handleUpdate (event) {
        console.log(event)
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