import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
    updateCartItemQuantity,
    getCartItems,
    clearCart,
    calculateTotalPrice
  } = useContext(CartContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCartItems();
  }, []);

  const handleShippingAddressPage = () => {
    navigate("/add-shipping-address");
  };
  const handleCheckOutPage = () => {
    navigate("/check-out");
  };
  const handleQuantityChange = (item, e) => {
    const quantity = e.target.value ? parseInt(e.target.value) : 1;
    updateCartItemQuantity(item, quantity);
  };
  const removeCardItem = (item, e) => {
    removeFromCart(item);
  };


  return (
    <>
      <div className="cart-page">
        <h1>Cart Page</h1>
        {cartItems?.items?.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems?.items?.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={`http://localhost:9000/api/v1/products/${item.productId}/image`}
                  alt="paint"
                />
                <div className="cart-item-content">
                  <h3>Code:{item.code}</h3>
                  <p>Price: ${item.amount}</p>
                  <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    value={item.quantity || 1}
                    min={1}
                    max={10}
                    onChange={(e) => handleQuantityChange(item, e)}
                  />
                  <button
                    className="remove-button"
                    onClick={() => removeCardItem(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="total-price">Total Price: ${cartItems.total}</p>
      </div>
      <div className="cart-page ">
        <button
          className="clear-button"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
      <div className="checkout-container">
        <button onClick={handleShippingAddressPage}>
          Continue To ShippingAddress
        </button>
        <button
          id="checkoutButton"
          onClick={handleCheckOutPage}
          disabled={loading}
        >
          {loading ? "Processing..." : "Check Out"}
        </button>
      </div>
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default CartPage;
