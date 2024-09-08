//server/controllers/payment.controllers.js



const mongoose = require('mongoose');
const stripe = require('../config/stripe.config');
const Order = require('../models/order.models');

const createPaymentIntent = async (req, res) => {
  const { amount, currency, orderId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    res.status(500).send({
      error: err.message,
    });
  }
};

const markOrderAsPaid = async (req, res) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    console.error(`Invalid order ID: ${orderId}`);
    return res.status(400).send({ error: 'Invalid order ID' });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      console.error(`Order not found: ${orderId}`);
      return res.status(404).send({ error: 'Order not found' });
    }

    if (order.paymentMethod === 'CreditCard') {
      order.status = 'Paid'; // Update order status to 'Paid'
      await order.save();
      res.status(200).send(order);
    } else {
      console.error(`Invalid payment method for order: ${orderId}`);
      res.status(400).send({ error: 'Invalid payment method for this endpoint' });
    }
  } catch (err) {
    console.error('Error marking order as paid:', err); // Add detailed logging
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = { createPaymentIntent, markOrderAsPaid };
