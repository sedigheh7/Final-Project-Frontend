import React, { useContext,useState,useEffect } from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { CartContext } from "../contexts/cartContext"
import { CustomerContext } from "../contexts/customerContext";

const publishableKey ="pk_test_51NL8ZOJQMNMCvmfAD3VTJ1rQ6dMCMriOcvSyTaU6FqzdK3a0WbOvrsFQfULfsI0mYV6BQJ5FGPzXUbxueZZAaWhk00wVmc6GYf"
function CheckoutFormWrapper() {
  const {cartItems} =useContext(CartContext);
  const customer = useContext(CustomerContext)
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/v1/customers/profile/${customer.id}`
        ); // Adjust the API endpoint as per your server configuration
        setUserProfile(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error retrieving user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:9000/api/v1/stripePayment/charge',
        method: 'post',
        data: {
          amount: cartItems.total * 100,
          token,
        },
      });
      return response.status(201).json()
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
    <h2>Payment method</h2>
     {cartItems?.items.map((item)=>(
      <div className="container">
    
    <p>
      <span>Product: </span>{item.productId}
      
    </p>
    <p>
      <span>Price: $</span>{item.amount}
    </p>
   <hr/>
  </div>
    ))}
     <h5>
      <span>Total price: $</span>{cartItems.total}
    </h5>
    <h4 >Shipping Address:</h4>
          <p> {userProfile?.ShippingAddress?.addressLine1},  
              {userProfile?.ShippingAddress?.city},
              {userProfile?.ShippingAddress?.postalCode} 
              {userProfile?.ShippingAddress?.state}, 
              {userProfile?.ShippingAddress?.country}
          </p>
    <StripeCheckout
      stripeKey={publishableKey}
      label="Pay Now"
      name="Pay With Credit Card"
      billingAddress
      amount={cartItems.total * 100}
      description={`Your total is $${cartItems.total}`}
      
      token={payNow}
    />
    </>
   
    
  )
  
}
export default CheckoutFormWrapper
