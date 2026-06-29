const ServiceRequest = require('../models/ServiceRequest');

const submitServiceRequest = async (req, res) => {
  try {
    const { roomNumber, serviceType, notes, scheduledAt, guestName } = req.body;
    const request = await ServiceRequest.create({
      guest: req.guest?._id,
      guestName: guestName || req.guest?.name || 'Guest',
      roomNumber,
      serviceType,
      notes,
      scheduledAt: scheduledAt || undefined,
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyServiceRequests = async (req, res) => {
  const requests = await ServiceRequest.find({ guest: req.guest._id }).sort({ createdAt: -1 });
  res.json(requests);
};

module.exports = { submitServiceRequest, getMyServiceRequests };
