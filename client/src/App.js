import React, { useContext } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import Welcome from './components/Welcome.js'
import './App.css';
import  {UserContext}  from './context/user.js'
import Menu from './components/Menu.js'
import OrdersLog from './components/OrdersLog.js'
import Login from './components/Login.js'
import MostPopularItem from './components/MostPopularItem.js'
import PreviousAddress from './components/PreviousAddress.js'
import NavBar from './components/NavBar.js'



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
        {console.log(currentUser)}
       
    return ( 
    
    <div>
      <NavBar/>
      <h2>Welcome, {currentUser.username}!</h2>
      <Menu />
      {/* <PreviousAddress /> */}
      
      {/* {currentUser.orders ? <OrdersLog/> : null } */}

      {/* some routes, login page, order page, most popular order page, or most popular item page, profile page,  */}

      
      <button onClick={logOut}>LogOut</button>
      </div>);
  } 
  else {
    return (
    <div>
      <Login />
    </div>
    );
  }

}

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />}/>
        <Route path="/orders" element={<OrdersLog />} />
        <Route path="/most-popular-item" element={<MostPopularItem />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
