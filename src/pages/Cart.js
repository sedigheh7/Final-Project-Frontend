import React, { useContext, useEffect,useState } from "react";
import { CartContext } from "../contexts/cartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";



const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartItemQuantity,
    saveCartItemData,
    getCartItems,
    clearCart
  } = useContext(CartContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    getCartItems();
  }, [])

  const handleShippingAddressPage = () => {
    navigate("/add-shipping-address");
  };
  const handleCheckOutPage = () => {
    navigate("/check-out");
  };

  const handleSaveCart = async () => {
    try {
      const cartData = {
        cartItems: cartItems,
        totalPrice: calculateTotalPrice(),
      };
      // Send an API request to save the cart data
      await saveCartItemData(cartData);
      alert("Cart data saved successfully");
    } catch (error) {
      console.error("Error saving cart data:", error);
      alert("Failed to save cart data");
    }
  };

  const handleQuantityChange = (product, e) => {
    const quantity = e.target.value ? parseInt(e.target.value) : 1;
    updateCartItemQuantity(product, quantity);
  };

  const calculateTotalPrice = () => {
    return cartItems?.reduce((prev, next) => {
      console.log(prev, next.quantity, next.amount)
      prev += next.quantity * next.amount;
      return prev;
    }, 0);
  };

  return (
    <>
      <div className="cart-page">
        <h1>Cart Page</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={`http://localhost:9000/api/v1/products/${item.productId}/image`}
                  alt="paint"
                />
                <div className="cart-item-content">
                  <h3>Code:{item.code}</h3>
                  <p>Price: ${item.price}</p>
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
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p>Total Price: ${calculateTotalPrice()}</p>
        <button id="checkoutButton" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
      <div className="checkout-container">
        <button id="checkoutButton" onClick={handleShippingAddressPage}>
          Continue To ShippingAddress
        </button>
        <button
          id="checkoutButton"
          onClick={handleCheckOutPage}
          disabled={loading}
        >
          {loading ? "Processing..." : "Check Out"}
        </button>
        {/* <button id="checkoutButton" onClick={handleCheckOutPage}>
          {" "}
          Check Out
        </button> */}
        <button id="checkoutButton" onClick={handleSaveCart}>
          Save Cart
        </button>
      </div>
      <div>
        {/* <h2>Payment Details</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements> */}
      </div>
    </>
  );
};

export default CartPage;
