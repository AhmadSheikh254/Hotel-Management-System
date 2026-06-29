const Feedback = require('../models/Feedback');

const getFeedback = async (req, res) => {
  const feedback = await Feedback.find({ approved: true }).sort({ createdAt: -1 });
  res.json(feedback.map((f) => ({
    id: f._id,
    name: f.name,
    rating: f.rating,
    text: f.text,
    role: f.role,
    createdAt: f.createdAt,
  })));
};

const submitFeedback = async (req, res) => {
  try {
    const { name, rating, text } = req.body;
    const entry = await Feedback.create({
      guest: req.guest?._id,
      name,
      rating,
      text,
    });
    res.status(201).json({
      id: entry._id,
      name: entry.name,
      rating: entry.rating,
      text: entry.text,
      role: entry.role,
      createdAt: entry.createdAt,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getFeedback, submitFeedback };
