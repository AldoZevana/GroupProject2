	//server/controllers/admin.controllers.js

    const Admin = require('../models/admin.models');
    const Order= require('../models/order.models');
    const Client= require('../models/user.models')
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    module.exports = {
      register: async (req, res) => {
        try {
            const { username, email, password, confirmPassword } = req.body;
            
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match.' });
            }
    
            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                return res.status(400).json({ message: 'Admin already exists.' });
            }
    
            const newAdmin = new Admin({
                username,
                email,
                password,
                confirmPassword
            });
    
            await newAdmin.save();
            res.status(201).json({ message: 'Admin registered successfully.' });
        } catch (error) {
            console.error('Error registering admin:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    },
    
    
    login : async (req, res) => {
      const { email, password } = req.body;
      
      try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
          return res.status(400).json("Email not found");
        }
    
        const correctPassword = await bcrypt.compare(password, admin.password);
        if (!correctPassword) {
          return res.status(400).json("Incorrect password");
        }
    
        const adminToken = jwt.sign({ id: admin._id, username: admin.username }, process.env.FIRST_SECRET_KEY);
        res.cookie("admintoken", adminToken, { httpOnly: true }).json({  admin });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
    },
    
    logout: (req, res) => {
        res.clearCookie('admintoken');
        res.sendStatus(200);
    },
    checkAuth :async(req, res) => {
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
      },
      
    
    getAllClientsOrders: (req, res) => {
        Client.find()
          .populate('orders')
          .then(clients => res.json(clients))
          .catch(err => res.status(400).json(err));
      },
    deleteClient :(req, res) => {
        Order.deleteOne({ _id: req.params.id })
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.json(err))
    }
    }
    