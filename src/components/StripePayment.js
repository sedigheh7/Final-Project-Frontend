import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import * as dotenv from "dotenv";
// dotenv.config();
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const cardElement = elements.getElement(CardElement);
  
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        console.log('[error]', error);
      } else {
    // Send paymentMethod.id to your server
    const response = await fetch('http://localhost:9000/api/v1/stripePayment/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: 1000 })
    });
  
    const charge = await response.json();
  
    console.log('[Charge]', charge);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  };
  export default CheckoutForm