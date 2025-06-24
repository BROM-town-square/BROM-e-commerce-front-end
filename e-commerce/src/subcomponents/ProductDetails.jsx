import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

const ProductDetail = () => {
  const { state } = useLocation()
  const product = state?.product
  const navigate = useNavigate()

  const handleBackToList = () => {
    navigate('/Menu')  
  }