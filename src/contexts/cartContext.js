import { createContext, useState,useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { initializeHttpService } from '../services/httpService';
import useCheckCustomer from '../hooks/useCheckCustomer';
import axios from 'axios';
import { api } from "../services/httpService";
import { CustomerContext } from "./customerContext";

export const CartContext = createContext();


export const CartContextProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  initializeHttpService(getAccessTokenSilently, 'http://localhost:9000/api/v1/');

  const [cartItems, setCartItems] = useState([]);
  const customer = useContext(CustomerContext)

  useEffect(() => {
    getCartItems();
  }, [customer]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    addProductToCart(customer.id,product)
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== product.id));
    removeProductFromCart(customer.id, product.id);
  };

  const updateCartItemQuantity = (product, quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity };
        }
        return item;
      });
      return updatedItems;
    });
    updateProductQuantity(customer.id, product.id, quantity);
  };

  const addProductToCart = async (customerId, product) => {
    try {
      const cartItemData = {
        customerId:customerId,
        productId:product.id,
        quantity:1,
        amount:product.price
      }
      const response = await api.post(`/customers/customer-cart/${customerId}`,cartItemData);
      return response.data;
    } catch (error) {
      throw new Error('Error while retrieving cart data');
    }
  };

  const getCartItems = async ()=>{
    try {
      const customerId = customer.id
      const response = await api.get(`/customers/customer-cart/${customerId}`);
      setCartItems(response.data);
    } catch (error) {
      throw new Error('Error while retrieving cart data');
    }
  }

  const removeProductFromCart = async (customerId, productId) => {
    try {
      await api.delete(`/customers/customer-cart/${customerId}/${productId}`);
    } catch (error) {
      console.error("Error removing product from cart:", error);
      alert("Failed to remove product from cart");
    }
  };

  const updateProductQuantity = async (customerId, productId, quantity) => {
    try {
      const cartItemData = {
        customerId: customerId,
        productId: productId,
        quantity: quantity,
      };
      await api.put(`/customers/customer-cart/${customerId}/${productId}`, cartItemData);
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      alert("Failed to update cart item quantity");
    }
  };
  const clearCart = async () => {
    try {
      const customerId = customer.id;
      await api.delete(`/customers/customer-cart/${customerId}`);
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart");
    }
  };

  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getCartItems,
    clearCart
  };
  return (
   
      <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
    
  );
};
