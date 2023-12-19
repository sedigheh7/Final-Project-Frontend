import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import "./StripePayment.css"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

//console.log("process.env.STRIPE_PUBLISHABLE_KEY", process.env.STRIPE_PUBLISHABLE_KEY)

//const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe("pk_test_51NL8ZOJQMNMCvmfAD3VTJ1rQ6dMCMriOcvSyTaU6FqzdK3a0WbOvrsFQfULfsI0mYV6BQJ5FGPzXUbxueZZAaWhk00wVmc6GYf");


  const Wrapper = (props) => (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
  

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
        <fieldset className="FormGroup">
          <div className="FormRow">
          <CardElement  options={CARD_OPTIONS} />
          </div>
        </fieldset>
        
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  };


  export default Wrapper