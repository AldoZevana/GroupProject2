import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar'
const Orders = ({loggedIn, user, handleLogout, setSearchTerm}) => {
  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <NavBar loggedIn={loggedIn} user={user} handleLogout={handleLogout} setSearchTerm={setSearchTerm}/>
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p>Order Number: {order.orderNumber}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>City: {order.qyteti}</p>
              <p>Address: {order.adresa}</p>
              <p>Status: {order.status}</p>
              <ul>
                {order.items && order.items.map((item, index) => (
                  <li key={index}>{item.name || 'Item'} - Quantity: {item.quantity || 1}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
