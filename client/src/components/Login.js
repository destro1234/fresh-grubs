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
                    res.json().then(setCurrentUser)
                }
            else {
                res.json()
            }
        })

       
    }
  
    return (
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
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button onClick={(e) => onSignup(e)}>Signup</button>
        <button type="submit">Login</button>
      </form>
    );
  }

  export default Login;