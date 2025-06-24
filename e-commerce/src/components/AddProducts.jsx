import React, { useState } from 'react'

const AddProducts = ({products}) => {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productCategory: '',
    productDescription: '',
    productImage: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    if (formData.productPrice <= 0) {
      alert('Product price must be a positive number.')
      return
    }

    const lastId = products.length > 0 ? parseInt(products[products.length - 1].id) : 0;
    const newId = (lastId + 1).toString();

    const productData = {
      id: newId,
      name: formData.productName,
      price: parseFloat(formData.productPrice),
      category:formData.productCategory,
      description: formData.productDescription,
      image: formData.productImage
    }

    fetch('https://taste-town-server.vercel.app/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
    
      .then((res) => res.json())
      .then((data) => {
        console.log('Product added:', data)
        alert('Product added successfully!')
        
      })
      .catch((error) => console.error('Error:', error))
      
      setFormData({
        productName: '',
        productPrice: '',
        productCategory: '',
        productDescription: '',
        productImage: ''
      
      })
  }
  
  return (
    <div className='add-product-container'>
      <h1>Add Products</h1>
      <form onSubmit={handleSubmit}>
        
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
       
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            required
          />
       
          <label htmlFor="productCategory">Product Category:</label>
          <input
            type="text"
            id="productCategory"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            required
          />
        
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            required
          ></textarea>
       
          <label htmlFor="productImage">Product Image URL:</label>
          <input
            type="url"
            id="productImage"
            name="productImage"
            value={formData.productImage}
            onChange={handleChange}
            required
          />
        
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProducts