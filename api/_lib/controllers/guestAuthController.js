const jwt = require('jsonwebtoken');
const Guest = require('../models/Guest');

const generateGuestToken = (id) => jwt.sign({ id, role: 'guest' }, process.env.JWT_SECRET, { expiresIn: '30d' });

const formatGuest = (guest) => ({
  id: guest._id,
  _id: guest._id,
  name: guest.name,
  email: guest.email,
  phone: guest.phone || '',
  createdAt: guest.createdAt,
});

// @route POST /api/guest-auth/register
const registerGuest = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const exists = await Guest.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }
    const guest = await Guest.create({ name, email, password, phone });
    const token = generateGuestToken(guest._id);
    res.status(201).json({ ...formatGuest(guest), token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @route POST /api/guest-auth/login
const loginGuest = async (req, res) => {
  try {
    const { email, password } = req.body;
    const guest = await Guest.findOne({ email });
    if (!guest || !(await guest.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const token = generateGuestToken(guest._id);
    res.json({ ...formatGuest(guest), token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @route PUT /api/guest-auth/profile
const updateProfile = async (req, res) => {
  try {
    const guest = await Guest.findById(req.guest._id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    guest.name = req.body.name || guest.name;
    guest.phone = req.body.phone ?? guest.phone;
    const updated = await guest.save();
    res.json(formatGuest(updated));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @route GET /api/guest-auth/me
const getMe = async (req, res) => {
  res.json(formatGuest(req.guest));
};

module.exports = { registerGuest, loginGuest, updateProfile, getMe };
