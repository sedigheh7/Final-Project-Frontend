import { createContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { initializeHttpService } from '../services/httpService';
import useCheckCustomer from '../hooks/useCheckCustomer';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  initializeHttpService(getAccessTokenSilently, 'http://localhost:9000/api/v1/');

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== product.id));
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
  };

  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
  };
  return (
   
      <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
    
  );
};
