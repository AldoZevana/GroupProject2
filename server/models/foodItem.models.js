//server/models/foodItem.models.js

const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity:{type: Number, required:true},
  imageUrl: { type: String, required: true },
  category:{type:String, enum:['salad','rolls','dessert','sandwich']}
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', FoodItemSchema);
