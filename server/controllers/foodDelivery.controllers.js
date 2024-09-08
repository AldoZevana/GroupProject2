//server/foodDelivery.controllers.js

const FoodDelivery = require('../models/foodDelivery.models');

const getAllFoodDeliveries = async (req, res) => {
  try {
    const deliveries = await FoodDelivery.find();
    return res.json(deliveries);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch food deliveries", details: error.message });
  }
};

const createFoodDelivery = async (req, res) => {
  const { restaurantName } = req.body;
  try {
    const newDelivery = new FoodDelivery({ restaurantName });
    await newDelivery.save();
    return res.status(201).json(newDelivery);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create food delivery", details: error.message });
  }
};

const updateFoodDelivery = async (req, res) => {
  try {
    const updatedDelivery = await FoodDelivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updatedDelivery);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update food delivery", details: error.message });
  }
};

const deleteFoodDelivery = async (req, res) => {
  try {
    const deletedDelivery = await FoodDelivery.findByIdAndDelete(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete food delivery", details: error.message });
  }
};

module.exports = { getAllFoodDeliveries, createFoodDelivery, updateFoodDelivery, deleteFoodDelivery };
