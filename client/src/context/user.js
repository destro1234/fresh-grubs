import React, { useEffect, useState } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] =  useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const [errors, setErrors] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});
  const [newOrderItems, setNewOrderItems] = useState([]);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        errors,
        setErrors,
        currentOrder,
        setCurrentOrder,
        newOrderItems,
        setNewOrderItems,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };