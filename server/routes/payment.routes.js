//server/routes/payment.routes.js


const { createPaymentIntent,markOrderAsPaid } = require('../controllers/payment.controllers');

module.exports = (app) => {
  app.post('/api/create-payment-intent', createPaymentIntent);
  app.post('/api/orders/:orderId/pay', markOrderAsPaid);
};
