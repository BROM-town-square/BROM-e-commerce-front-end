import React from 'react'

const DeleteProducts = ({products,setproducts}) => {

  async function handleDelete(id) {
    try {
      const res = await fetch(`https://taste-town-server.vercel.app/items/${id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error('Failed to delete from server');
      }
  
      const filtered = products.filter(product => String(product.id) !== String(id));
      setproducts(filtered);
       
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  }
  

  return (
    <div className="admin-panel">
      <h2 className="admin-title">DELETE </h2>
      {products.length === 0 ? (
        <p className="no-products">No products available.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(product.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  
  )
}

export default DeleteProducts