import React, { useState, useEffect } from 'react';

const EditProduct = ({ editingProduct, setEditingProduct, setproducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        price: editingProduct.price || '',
        category: editingProduct.category || '',
        description: editingProduct.description || '',
        image: editingProduct.image || ''
      });
    }
  }, [editingProduct]);

  if (!editingProduct) return null; // <-- Prevent rendering if undefined

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/food/${editingProduct.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');

      alert('Product updated!');
      setproducts(prev =>
        prev.map(p => (p.id === editingProduct.id ? data : p))
      );
      setEditingProduct(null);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProduct;
