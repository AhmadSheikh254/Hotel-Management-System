const mongoose = require('mongoose');

const serviceRequestSchema = mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
  },
  guestName: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  scheduledAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
