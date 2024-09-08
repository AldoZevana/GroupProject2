import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ amount, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!orderId) {
      console.error('Order ID is required');
      setPaymentError('Order ID is required');
    }
  }, [orderId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        address: {
          postal_code: cardElement.value?.postalCode || '', // Handle undefined postalCode
        },
      },
    });

    if (error) {
      setPaymentError(error.message);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/create-payment-intent', {
        amount: amount * 100, // Convert amount to cents
        currency: 'usd',
        orderId: orderId,
      });

      const clientSecret = response.data.clientSecret;

      const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmCardPayment.error) {
        setPaymentError(confirmCardPayment.error.message);
      } else {
        setPaymentSuccess(true);
        // Optionally update order status on server to 'Paid'
        await axios.post(`http://localhost:8000/api/orders/${orderId}/pay`);
      }
    } catch (error) {
      setPaymentError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#32325d',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#fa755a',
            },
          },
          hidePostalCode: false, // Ensure postal code input is displayed
        }}
      />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {paymentError && <div>{paymentError}</div>}
      {paymentSuccess && <div>Payment Successful!</div>}
    </form>
  );
};

export default CheckoutForm;
