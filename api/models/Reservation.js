const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  guestName: {
    type: String,
  },
  guestEmail: {
    type: String,
  },
  guestCount: {
    type: Number,
    default: 1,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  specialRequests: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Checked In', 'Checked Out', 'Cancelled'],
    default: 'Pending',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Partially Paid', 'Failed'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservation', reservationSchema);
