import React from 'react'
import { NavLink } from "react-router-dom"


function NavBar() {
    return (
        

        <div className="nav nav-pills">
            
            <NavLink style={{ marginLeft: '.5rem' }} to={"/"} >Menu</NavLink>
            
            <NavLink style ={{ marginLeft: '.5rem' } }to={"/orders"}>All Orders </NavLink>
            
            <NavLink style={{ marginLeft: '.5rem' }} to={"/most-popular-item"}>Most Popular Item</NavLink>

        </div>
        
    )
}

export default NavBar;