const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ['card', 'bank', 'cash'],
    default: 'card',
  },
  cardLast4: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Completed',
  },
  transactionId: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Payment', paymentSchema);
