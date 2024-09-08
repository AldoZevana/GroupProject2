//server/models/foodDelivery.models.js

const mongoose = require('mongoose');

const foodDeliverySchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true,
    },
    
});

const FoodDelivery = mongoose.model('FoodDelivery', foodDeliverySchema);
module.exports = FoodDelivery;
