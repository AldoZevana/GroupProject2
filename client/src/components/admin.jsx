import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/orders', {
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

    socket.on('orderStatusUpdated', (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.off('orderStatusUpdated');
    };
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/admin/orders/${orderId}`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
        socket.emit('orderStatusUpdated', { _id: orderId, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  return (
    <div>
      <div className="ordersContainer">
        <h1>Porositë</h1>
        {orders.length > 0 ? (
          <ul>
            {orders.map((order, index) => (
              <li key={index} className="order-item">
                <p>Numri i porosisë: {order.orderNumber}</p>
                <p>Data: {new Date(order.createdAt).toLocaleString()}</p>
                <p>Qyteti: {order.qyteti}</p>
                <p>Adresa: {order.adresa}</p>
                <p>Statusi: {order.status}</p>
                <ul>
                {order.items && order.items.map((FoodItem, index) => (
                  <li key={index}>{FoodItem.name || 'Item'} - Sasia: {FoodItem.quantity || 1}</li>
                ))}
              </ul>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Cooking">Cooking</option>
                <option value="Finished">Finished</option>
              </select>
              <button id='delete' onClick={() => handleDelete(order._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nuk ka porosi.</p>
      )}
    </div>
  </div>
);
};

export default AdminOrders;