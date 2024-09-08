//server/routes/foodDelivery.routes.js

const FoodDeliveryController = require('../controllers/foodDelivery.controllers');

module.exports = app => {
  app.get('/api/foodDeliveries', FoodDeliveryController.getAllFoodDeliveries);
  app.post('/api/foodDeliveries', FoodDeliveryController.createFoodDelivery);
  app.put('/api/foodDeliveries/:id', FoodDeliveryController.updateFoodDelivery);
  app.delete('/api/foodDeliveries/:id', FoodDeliveryController.deleteFoodDelivery);
};
