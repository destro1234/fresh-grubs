import React, { useState, useContext} from 'react'
import Welcome from './components/Welcome.js'
import './App.css';
import  {UserContext}  from './context/user.js'
import Menu from './components/Menu.js'
import OrdersLog from './components/OrdersLog.js'


function App() {

  const {currentUser, setCurrentUser } = useContext(UserContext)

 

    function logOut() {
      fetch("/logout", {
        method: "DELETE",
      }).then(() => {
        setCurrentUser(null)
      });
     }

     


   
     
     
      if (currentUser) {
       
    return ( 
    
    <React.Fragment>
      <h2>Welcome, {currentUser.username}!</h2>
      <Menu />

      

            

      {currentUser.orders ? <OrdersLog/> : null }

      
      <button onClick={logOut}>LogOut</button>
      </React.Fragment>);
  } else {
    return (
    <React.Fragment>
      <Welcome />
    </React.Fragment>
    );
  }

}

export default App;
