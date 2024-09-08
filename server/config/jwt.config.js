const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.FIRST_SECRET_KEY;

if (!secret) {
    throw new Error('FIRST_SECRET_KEY environment variable is not defined');
}

module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) { 
      return res.status(401).json({verified: false});
    } else {
      next();
    }
  });
}