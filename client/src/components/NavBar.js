import React from 'react'
import { NavLink } from "react-router-dom"


function NavBar() {
    return (
        

        <div className="nav nav-pills">
            
            <NavLink style={{ marginLeft: '.5rem' }} to={"/"} >Store</NavLink>
            
            <NavLink style ={{ marginLeft: '.5rem' } }to={"/closet"}>Closet</NavLink>
            
            <NavLink style={{ marginLeft: '.5rem' }} to={"/flipped"}>Flipped</NavLink>

        </div>
        
    )
}

export default NavBar;