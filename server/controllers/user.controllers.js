//server/controllers/user.controllers.js

const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

// Register a new user
module.exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const userToken = jwt.sign({ id: user._id, firstName: user.firstName }, process.env.FIRST_SECRET_KEY);
    res.cookie("usertoken", userToken, { httpOnly: true }).json({ msg: "Registration successful!", user });
  } catch (err) {
    console.error(err); 
    res.status(400).json({ err });
  }
};

// Login endpoint
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("Email not found");
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json("Incorrect password");
    }

    const userToken = jwt.sign({ id: user._id, firstName: user.firstName }, process.env.FIRST_SECRET_KEY);
    res.cookie("usertoken", userToken, { httpOnly: true }).json({  user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Logout endpoint
module.exports.logout = (req, res) => {
  res.clearCookie('usertoken');
  res.sendStatus(200);
};

// Check authentication status
module.exports.checkAuth = (req, res) => {
  const token = req.cookies.usertoken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.FIRST_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      res.status(200).json({ msg: "Authorized", user: decoded });
    }
  });
};

// Update user information
module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(500).json({ message: "User update failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
