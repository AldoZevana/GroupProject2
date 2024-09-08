//server/routes/order.routes.js

const { createOrder, getOrderStatus, getAllOrders, deleteOrder, updateOrderStatus } = require('../controllers/order.controllers');
const { authenticate } = require('../middleware/authenticate');

module.exports = app => {
  app.post('/api/orders', authenticate, createOrder);
  app.get('/api/orders', authenticate, getAllOrders);
  app.get('/api/orders/:id/status', authenticate, getOrderStatus);
  app.put('/api/orders/:id/status', authenticate, updateOrderStatus);
  app.delete('/api/admin/orders/:id', deleteOrder);
};
