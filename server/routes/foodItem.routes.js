//server/routes/foodItem.routes.js

const FoodItemController = require('../controllers/foodItem.controllers');

module.exports = app => {
  app.post('/api/foodItems', FoodItemController.createFoodItem);
  app.get('/api/foodItems', FoodItemController.getAllFoodItems);
  app.put('/api/foodItems/:id', FoodItemController.updateFoodItem);
  app.delete('/api/foodItems/:id', FoodItemController.deleteFoodItem);
};
