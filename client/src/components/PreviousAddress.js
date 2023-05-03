import React, { useContext } from 'react'
import  {UserContext}  from '../context/user.js'




function PreviousAddress() {
    const {currentUser, setCurrentUser} = useContext(UserContext)

    const userAddresses = currentUser.orders.map( order => order.address )
    return(
        <div>
            <h1>These are all your previous addresses</h1>
            <ol>
            {userAddresses.map(address => {
               return <li>{address}</li> 
            })}
            </ol>
        </div>
    )
}

export default PreviousAddress;