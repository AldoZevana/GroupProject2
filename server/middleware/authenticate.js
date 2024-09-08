// server/middleware/authenticate.js

const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret = process.env.FIRST_SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
  const token = req.cookies.usertoken;
  if (!token) {
    return res.status(401).json({ verified: false, message: "No token provided" });
  }

  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      return res.status(401).json({ verified: false, message: "Invalid token" });
    } else {
      req.userId = payload.id;
      req.userRole = payload.role; // Assuming the token payload contains a role property
      next();
    }
  });
};

// Middleware for admin routes
module.exports.adminAuthenticate = (req, res, next) => {
  const token = req.cookies.admintoken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) {
    return res.status(401).json({ verified: false, message: "No token provided" });
  }

  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      return res.status(401).json({ verified: false, message: "Invalid token" });
    } else {
      if (payload.role !== 'admin') {
        return res.status(403).json({ verified: false, message: "Forbidden: Admins only" });
      }
      req.userId = payload.id;
      next();
    }
  });
};
