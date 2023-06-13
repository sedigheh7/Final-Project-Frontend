import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/cartContext';
import { CustomerContext } from '../contexts/customerContext';
import productService from '../services/productService';

const ShopPage = () => {
  const customer = useContext(CustomerContext);
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Shop Page</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Code: {product.code}</p>
          <p>Size: {product.size}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ShopPage;
