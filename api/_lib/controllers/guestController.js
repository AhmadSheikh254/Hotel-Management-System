const Guest = require('../models/Guest');

// @desc    Get all guests
// @route   GET /api/guests
// @access  Private
const getGuests = async (req, res) => {
  const guests = await Guest.find({});
  res.json(guests);
};

// @desc    Create a guest
// @route   POST /api/guests
// @access  Private
const createGuest = async (req, res) => {
  const { name, email, phone, idType, idNumber } = req.body;

  const guest = new Guest({
    name,
    email,
    phone,
    idType,
    idNumber
  });

  const createdGuest = await guest.save();
  res.status(201).json(createdGuest);
};

// @desc    Update a guest
// @route   PUT /api/guests/:id
// @access  Private
const updateGuest = async (req, res) => {
  const { name, email, phone, idType, idNumber, status } = req.body;

  const guest = await Guest.findById(req.params.id);

  if (guest) {
    guest.name = name || guest.name;
    guest.email = email || guest.email;
    guest.phone = phone || guest.phone;
    guest.idType = idType || guest.idType;
    guest.idNumber = idNumber || guest.idNumber;
    guest.status = status || guest.status;

    const updatedGuest = await guest.save();
    res.json(updatedGuest);
  } else {
    res.status(404).json({ message: 'Guest not found' });
  }
};

module.exports = { getGuests, createGuest, updateGuest };
