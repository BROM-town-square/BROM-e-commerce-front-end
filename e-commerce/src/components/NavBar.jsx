import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBagShopping,faUserGear} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


const NavBar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
        <img src={logo} alt="Taste Town Logo" />
        <nav className='nav-links'>
            <Link to="/">Home</Link>
            <Link to="/Menu">Menu</Link>
            <Link to="/About">About us</Link>
            <Link to="/Contact">Contact</Link>

        </nav>
        <div className='sidebtn'>
          <button className='userbtn' onClick={() => navigate('/Admin')}><FontAwesomeIcon icon={faUserGear} /></button>
          <button className='shopbag'><FontAwesomeIcon icon={faBagShopping} /></button>
          <button className='signbtn'>Sign Up</button>
        </div>
        
    </div>
  )
}

export default NavBar