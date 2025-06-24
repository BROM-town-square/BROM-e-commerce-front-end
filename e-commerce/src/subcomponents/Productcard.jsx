import React from 'react'
import { useNavigate } from 'react-router-dom'

const IndividualProduct = ({image,name,price,product, addToCart }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/product/${product._id}`,{state: {product}})
  }
  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    addToCart(product);
  };
