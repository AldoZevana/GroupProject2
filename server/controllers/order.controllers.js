//server/controllers/order.controllers.js

const mongoose = require('mongoose');
const Order = require('../models/order.models');
const Item = require('../models/foodItem.models');

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items'); 
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

const createOrder = async (req, res) => {
  const { items, orderNumber, qyteti, adresa, paymentMethod } = req.body;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  try {
    const validItems = items.map(item => new mongoose.Types.ObjectId(item));
    const newOrder = new Order({ userId, items: validItems, orderNumber, qyteti, adresa, paymentMethod });
    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items'); 
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch orders', details: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId);
    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete order', details: error.message });
  }
};

const getOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (order) {
      return res.json({ status: order.status });
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch order status', details: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Cooking', 'Finished'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update order status', details: error.message });
  }
};

const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }

    if (order.paymentMethod === 'CreditCard') {
      order.status = 'Paid'; // Update order status to 'Paid'
      await order.save();
      res.status(200).send(order);
    } else {
      res.status(400).send({ error: 'Invalid payment method for this endpoint' });
    }
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = { createOrder, getOrderStatus, getAllOrders, deleteOrder, getOrder, updateOrderStatus, markOrderAsPaid };
