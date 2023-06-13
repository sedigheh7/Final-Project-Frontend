import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    fetch('/api/v1/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleEdit = (productId) => {
    // Handle edit button click
  };

  const handleDelete = (productId) => {
    // Handle delete button click
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.size}</p>
          <p>{product.price}</p>
          <button onClick={() => handleEdit(product.id)}>Edit</button>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
