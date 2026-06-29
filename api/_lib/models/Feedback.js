const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Verified Guest',
  },
  approved: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Feedback', feedbackSchema);
