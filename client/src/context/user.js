import React, { useEffect, useState } from "react";

const UserContext = React.createContext();






function UserProvider({ children }) {
    // the value prop of the provider will be our context data
    // this value will be available to child components of this provider

  const [currentUser, setCurrentUser ] = useState(null)

    useEffect(() => {
      fetch("/me").then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            setCurrentUser(user)
          
          });
        }
      });
    }, []);




    return <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>;
  }

  export { UserContext, UserProvider };