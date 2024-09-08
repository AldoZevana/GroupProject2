//server/models/order.models.js


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodItem',
    },
  ],
  status: {
    type: String,
    enum:['Pending','Cooking', 'Finished'],
    default: 'Pending',
  },
  qyteti: {
    type: String,
    required: true,
  },
  adresa: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
  paymentMethod:{
    type: String,
    enum: ['InPerson','CreditCard'],
    required: true},
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
