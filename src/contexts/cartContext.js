import { createContext, useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { initializeHttpService } from "../services/httpService";
import useCheckCustomer from "../hooks/useCheckCustomer";
import axios from "axios";
import { api } from "../services/httpService";
import { CustomerContext } from "./customerContext";
import { BsCheckLg } from "react-icons/bs";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  initializeHttpService(
    getAccessTokenSilently,
    "http://localhost:9000/api/v1/"
  );

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const customer = useContext(CustomerContext);
  console.log("from card context ",customer)

  useEffect(() => {
      getCartItems();
  }, [customer]);

  const addToCart = async (product) => {
    await addProductToCart(customer.id, product);
    await getCartItems()
  };

  const addProductToCart = async (customerId, product) => {
    try {
      const cartItemData = {
        customerId: customerId,
        productId: product.id,
        quantity: 1,
        amount: product.price,
      };
      const response = await api.post(
        `/customers/customer-cart/${customerId}`,
        cartItemData
      );
      return response.data; // basket
    } catch (error) {
      throw new Error("Error while retrieving cart data");
    }
  };
  // const addToCart = async (product) => {
  //   try {
  //     setCartItems((prevItems) => {
  //       const existingProductIndex = prevItems.findIndex(
  //         (item) => item.id === product.id
  //       );
  //       if (existingProductIndex !== -1) {
  //         const updatedItems = [...prevItems];
  //         updatedItems[existingProductIndex].quantity += 1;
  //         return updatedItems;
  //       }
  //       return [...prevItems, { ...product, quantity: 1 }];
  //     });
  
  //     await addProductToCart(customer.id, product);
  //   } catch (error) {
  //     console.error("Error adding product to cart:", error);
  //   }
  // };

  // const addToCart = async (product) => {
  //   try {
  //     setCartItems((prevItems) => {
  //       const existingProduct = prevItems.find((item) => item.id === product.id);
  //       if (existingProduct) {
  //         return prevItems.map((item) => {
  //           if (item.id === product.id) {
  //             return {
  //               ...item,
  //               quantity: item.quantity + 1,
  //             };
  //           }
  //           return item;
  //         });
  //       }
  //       return [...prevItems, { ...product, quantity: 1 }];
  //     });
  
  //     await addProductToCart(customer.id, product);
  //   } catch (error) {
  //     console.error("Error adding product to cart:", error);
  //   }
  // };

  const removeFromCart = async (product) => {
    await removeProductFromCart(customer.id, product.id);
    await getCartItems();
  };

  const removeProductFromCart = async (customerId, productId) => {
    try {
      const response = await api.delete(`/customers/customer-cart/${customerId}/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error removing product from cart:", error);
      alert("Failed to remove product from cart");
    }
  };

  const updateCartItemQuantity = async (item, quantity) => {
    try {
      await updateProductFromCart(customer.id, item, quantity);
      await getCartItems()
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const updateProductFromCart = async (customerId, item, quantity) => {
    try {
      const cartItemData = {
        customerId: customerId,
        productId: item.productId,
        quantity: quantity,
      };
      await api.put(
        `/customers/customer-cart/${customerId}/${item.productId}`,
        cartItemData
      );
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      alert("Failed to update cart item quantity");
    }
  };
  // const updateCartItemQuantity = async (product, quantity) => {
  //   try {
  //     const updatedItems = cartItems.map((item) => {
  //       if (item.id === product.id) {
  //         return { ...item, quantity };
  //       }
  //       return item;
  //     });
  
  //     setCartItems(updatedItems);
  //     await updateProductQuantity(customer.id, product.id, quantity);
  //   } catch (error) {
  //     console.error("Error updating cart item quantity:", error);
  //   }
  // };
  

  // const updateCartItemQuantity = (product, quantity) => {
  //   setCartItems((prevItems) => {
  //     const updatedItems = prevItems.map((item) => {
  //       if (item.id === product.id) {
  //         return { ...item, quantity };
  //       }
  //       return item;
  //     });
  //     return updatedItems;
  //   });
  //   updateProductQuantity(customer.id, product.id, quantity);
  // };



  const getCartItems = async () => {
    try {
      if(customer!==undefined){
        const customerId = customer.id;
        const response = await api.get(`/customers/customer-cart/${customerId}`);
        setCartItems(response.data);
      }
      
    } catch (error) {
      console.log("error")
      throw new Error("Error while retrieving cart data");
    }
  };

  const clearCart = async () => {
    try {
      const customerId = customer.id;
      await api.delete(`/customers/customer-cart/${customerId}`);
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  const calculateTotalPrice = () => {
    const totalPrice = cartItems?.reduce((prev, next) => {
      console.log(prev, next.quantity, next.amount);
      return (prev += next.quantity * next.amount);
    }, 0);
    setTotalPrice(totalPrice);
  };

  // const calculateTotalPrice = () => {
  //   return cartItems?.reduce((prev, next) => {
  //     console.log(prev, next.quantity, next.amount);
  //     prev += next.quantity * next.amount;
  //     return prev;
  //   }, 0);
  // };

  const cartContextValue = {
    cartItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getCartItems,
    clearCart,
    calculateTotalPrice,
  };
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
