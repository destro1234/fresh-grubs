import { useState, useContext } from 'react'
import { UserContext } from '../context/user.js'


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const { currentUser, setCurrentUser } = useContext(UserContext)
  
    function handleSubmit(e) {
      e.preventDefault();
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password}),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => setCurrentUser(user));
        }
      });
    }

    function onSignup(e) {
        e.preventDefault()
        const user = {
            username,
            password
        }
        
        fetch('/users', {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        })
            .then( res => {
                if(res.ok) {
                  res.json().then((data) => setCurrentUser(data))
                    
                
                }
            else {
                res.json()
            }
        })

       
    }
  
    return (
      <div>
         <div>
            <h1>Welcome to FreshGrubs!</h1>
            <h3>Sign in with your username and password</h3>
            </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br></br>
        <label htmlFor="password">Password: </label>

        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button onClick={(e) => onSignup(e)}>Signup</button>
        <button type="submit">Login</button>
      </form>
      </div>
    );
  }

  export default Login;