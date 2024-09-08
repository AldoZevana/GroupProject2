
const Admin = require('../controllers/admin.controllers');
const { adminAuthenticate } = require('../middleware/authenticate');
const Order=require('../controllers/order.controllers');
const express = require('express');
const router = express.Router();
module.exports = (app) => {
    app.post('/api/admin/register', Admin.register);
    app.post('/api/admin/login', Admin.login);
    app.get('/api/admin/logout', Admin.logout);
    app.get('/api/admin/orders', Order.getAllOrders);
    app.put('/api/admin/orders/:id',  Order.updateOrderStatus);
    app.delete('/api/admin/orders/:id', Order.deleteOrder);
    app.get('/api/adminCheckAuth', adminAuthenticate, Admin.checkAuth);
};
