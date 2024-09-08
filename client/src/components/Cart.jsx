import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';
import { food_list } from '../assets/assets'; // Ensure this import is correct and points to where food_list is defined

const Cart = ({ cartItems, removeFromCart, placeOrder, qyteti, setQyteti, adresa, setAdresa }) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('InPerson');
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const selectedItems = food_list.filter(item => cartItems.some(cartItem => cartItem.id === item._id));
    const itemsWithQuantities = selectedItems.map(item => {
      const cartItem = cartItems.find(cartItem => cartItem.id === item._id);
      return { ...item, quantity: cartItem.quantity };
    });
    setItemsInCart(itemsWithQuantities);
  }, [cartItems]);

  const calculateTotal = () => {
    return itemsInCart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    const orderDetails = {
      items: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
      orderNumber: `ORD-${Date.now()}`,
      qyteti,
      adresa,
      paymentMethod,
    };
  
    console.log('Order details:', orderDetails);
  
    try {
      const response = await axios.post('http://localhost:8000/api/orders', orderDetails, { withCredentials: true });
      console.log('Order created:', response.data);
      setOrderId(response.data._id); // Set the order ID
      placeOrder(paymentMethod);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  

  return (
    <div className="food-menuu">
      <h2 id='menuu'>Karta</h2>
      <ul className="space-y-2">
        {itemsInCart.map((item) => (
          <div key={item._id} className="food-item" id='dflex'>
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <img id='img' src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
            </div>
            <div id='desc'>
              <p>{item.description}</p>
              <label htmlFor="quantity">Sasia:</label>
              <p>{item.quantity}</p>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <button onClick={() => removeFromCart(item._id)} className="remove">Remove</button>
            </div>
          </div>
        ))}
      </ul>
      <div className="form-group">
        <label htmlFor="qyteti">Qyteti: </label>
        <input
          type="text"
          id="qyteti"
          value={qyteti}
          onChange={(e) => setQyteti(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="adresa">Adresa:</label>
        <input
          type="text"
          id="adresa"
          value={adresa}
          onChange={(e) => setAdresa(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="paymentMethod">Mënyra e pagesës:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="InPerson">Në person</option>
          <option value="CreditCard">Kredi</option>
        </select>
      </div>
      {paymentMethod === 'CreditCard' && (
        <CheckoutForm amount={calculateTotal()} orderId={orderId} />
      )}
      <button id='order' onClick={handlePlaceOrder}>Dërgo Porosinë</button>
    </div>
  );
};

export default Cart;

