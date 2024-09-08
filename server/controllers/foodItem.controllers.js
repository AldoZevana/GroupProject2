//server/controllers/foodItem.controllers.js

const FoodItem = require('../models/foodItem.models');

const createFoodItem = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  if (!name || !description || !price || !imageUrl) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newFoodItem = new FoodItem({ name, description, price, imageUrl });
    const savedFoodItem = await newFoodItem.save();
    return res.status(201).json(savedFoodItem);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create food item', details: error.message });
  }
};

const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    return res.status(200).json(foodItems);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch food items', details: error.message });
  }
};

const updateFoodItem = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  if (!name || !description || !price || !imageUrl) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedFoodItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageUrl },
      { new: true, runValidators: true }
    );
    if (!updatedFoodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    return res.status(200).json(updatedFoodItem);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update food item', details: error.message });
  }
};

const deleteFoodItem = async (req, res) => {
  try {
    const deletedFoodItem = await FoodItem.findByIdAndDelete(req.params.id);
    if (!deletedFoodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete food item', details: error.message });
  }
};

module.exports = { createFoodItem, getAllFoodItems, updateFoodItem, deleteFoodItem };
