import React from 'react'
import tasteImg from "../assets/tasteimg.png"
import Loadpage from '../components/Loadpage'

const Loadpageimg = () => {
  return (
    <div className='loaddis'>
        <Loadpage />
        <img src={tasteImg} alt="Loadpage image" />
    </div>
  )
}

export default Loadpageimg
