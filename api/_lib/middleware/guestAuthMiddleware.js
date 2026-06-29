const jwt = require('jsonwebtoken');
const Guest = require('../models/Guest');

const protectGuest = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== 'guest') {
        return res.status(401).json({ message: 'Not authorized as guest' });
      }
      req.guest = await Guest.findById(decoded.id).select('-password');
      if (!req.guest) {
        return res.status(401).json({ message: 'Guest not found' });
      }
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = { protectGuest };
