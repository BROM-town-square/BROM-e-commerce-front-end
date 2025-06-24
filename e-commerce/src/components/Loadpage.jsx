import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAppleWhole} from '@fortawesome/free-solid-svg-icons'

const Loadpage = () => {
  return (
    <div>
        <h1>Let's now shop<br></br> For daily food<br></br> & necessary.</h1>
        <p>We are truseted grocery shop you can buy <br></br>your necesary products use your phones</p>
        <button className='shop-now-btn'>Shop Now</button>
        <button className='download-btn'><FontAwesomeIcon icon={faAppleWhole} /> Download for ios</button>
    </div>
  )
}

export default Loadpage