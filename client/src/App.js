import React, { useContext} from 'react'
import Welcome from './components/Welcome.js'
import './App.css';
import  {UserContext}  from './context/user.js'


function App() {

  const {currentUser, setCurrentUser } = useContext(UserContext)
  // return (
    // <div className="App">
    //   <Welcome />

    function logOut() {
      fetch("/logout", {
        method: "DELETE",
      }).then(() => {
        setCurrentUser(null)
      });
     }
      
      if (currentUser) {
    return ( <React.Fragment>
      <h2>Welcome, {currentUser.username}!</h2>
      
      <button onClick={logOut}>LogOut</button>
      </React.Fragment>);
  } else {
    return (
    <React.Fragment>
      <Welcome />
    </React.Fragment>
    );
  }
    // </div>
  // );
}

export default App;
