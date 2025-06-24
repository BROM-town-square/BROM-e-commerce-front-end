import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Menu from "./components/Menu"
import Layout from './components/Layout'
import Errorlink from './components/Errorlink'
import ProductDetail from './subcomponents/ProductDetails'
import { useState,useEffect } from 'react'
import Admin from './components/Admin'


function App() {
   const [products, setproducts] = useState([])

   useEffect(() => {
    fetch('https://taste-town-server.vercel.app/items')
    .then(res => res.json())
    .then(data => setproducts(data))
  
   }, [])
   
  
      const router = createBrowserRouter([
        {
          path: '/',
          element: <Layout />,
          children: [
            { index: true, element: <Home /> },
            { path: 'About', element: <About /> },
            { path: 'Contact', element: <Contact /> },
            { path: 'Menu', element: <Menu products={products} /> },
            { path: 'product/:id', element: <ProductDetail /> },
            { path: 'Admin', element: <Admin products={products} setproducts={setproducts} /> }
          ]
        },
        {
          path: '*',
          element: <Errorlink />
        }
      ])
      

    return (
      <RouterProvider router={router}/>
    
  )
}

export default App
