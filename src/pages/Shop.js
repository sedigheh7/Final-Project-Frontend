import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/cartContext';
import { CustomerContext } from '../contexts/customerContext';
import productService from '../services/productService';
import './shop.css'

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
    <>
    <h1>Shop</h1>
    <div className="shop-page">
      
      {products.map((product) => (
        <div className="product-card" key={product.id}>
           <img src={`http://localhost:9000/api/v1/products/${product.id}/image`}/>
          <p>Code: {product.code}</p>
          <p>Size: {product.size}</p>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
    </>
  );
};

export default ShopPage;
