import React, { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } =
    useContext(CartContext);

  const handleQuantityChange = (product, e) => {
    const quantity = parseInt(e.target.value);
    updateCartItemQuantity(product, quantity);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div>
      <h1>Cart Page</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${item.id}`}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item, e)}
              />
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total Price: ${calculateTotalPrice()}</p>
    </div>
  );
};

export default CartPage;
