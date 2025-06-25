import React from 'react'
import { createBrowserRouter,RouterProvider, Navigate } from 'react-router-dom'
import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Menu from "./components/Menu"
import Layout from './components/Layout'
import Errorlink from './components/Errorlink'
import ProductDetail from './subcomponents/ProductDetails'
import { useState,useEffect } from 'react'
import Admin from './components/Admin'
import SignUp from './components/SignUp'
import AdminAuth from './components/AdminAuth'

function App() {
   const [products, setproducts] = useState([])

   useEffect(() => {
    fetch('/api/food')
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
            { path: 'admin-auth', element: <AdminAuth />},
            { path: 'Admin', element: localStorage.getItem('adminToken') ? <Admin products={products} setproducts={setproducts} /> : <Navigate to="/admin-auth" />},
            { path: 'signup', element: <SignUp /> }

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
