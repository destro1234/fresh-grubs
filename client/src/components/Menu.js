import React, {useState, useEffect} from 'react'
import Login from './Login.js'
import { Link, Route, Routes } from "react-router-dom"


function Menu () {

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('/items')
        .then( res => res.json())
        .then( data => setItems(data))
    }, [])

    console.log(items)

    function viewOrder() {
        return(
            <Link to={"/"}/>
        )

    }


    return (
        <div>
            <h1>Jesus Tacos</h1>
            <br></br>
                <h2>Menu</h2>
            <ol>
               { items.map((item) => {
                return (
                    <React.Fragment><li>{item.name} - ${item.price} </li>
                    <button>Add to order</button>
                    </React.Fragment>
                
                )
               })}

            </ol>

            <button onClick={viewOrder}>View current order!</button>

            {/* <Routes> */}
        {/* <Route path="/flipped">
        </Route> */}

        {/* <Route path="/closet">
        
        </Route> */}

        {/* <Route path="/" element={<Login />}>

        </Route>
      </Routes> */}
        </div>
    )
}

export default Menu;