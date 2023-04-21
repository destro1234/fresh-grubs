import React, {useState, useEffect} from 'react'

function Menu () {

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('/items')
        .then( res => res.json())
        .then( data => setItems(data))
    }, [])

    console.log(items)


    return (
        <div>
            <h1>Jesus Tacos</h1>
            <br></br>

            <ol>
                

            </ol>
        </div>
    )
}

export default Menu;