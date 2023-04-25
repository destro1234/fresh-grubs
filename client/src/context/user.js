import React, { useEffect, useState } from "react";

const UserContext = React.createContext();






function UserProvider({ children }) {
    // the value prop of the provider will be our context data
    // this value will be available to child components of this provider

  const [currentUser, setCurrentUser ] = useState(null)
  const [errors, setErrors] = useState([])
  const [currentOrder, setCurrentOrder] = useState({})
  const [newOrderItems, setNewOrderItems] = useState([])

    useEffect(() => {
      fetch("/me").then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            setCurrentUser(user)
          
          });
        }
      });
    }, []);




    return <UserContext.Provider value={{currentUser, setCurrentUser, errors, setErrors, currentOrder, setCurrentOrder, newOrderItems, setNewOrderItems }}>{children}</UserContext.Provider>;
  }

  export { UserContext, UserProvider };