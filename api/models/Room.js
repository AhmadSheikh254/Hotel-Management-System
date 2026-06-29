const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
  },
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'Suite',
  },
  price: {
    type: Number,
    required: true,
  },
  occupancy: {
    type: Number,
    default: 2,
  },
  size: {
    type: String,
    default: '45 m²',
  },
  beds: {
    type: String,
    default: '1 King Bed',
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Maintenance', 'Cleaning', 'Limited'],
    default: 'Available',
  },
  floor: {
    type: Number,
    required: true,
  },
  amenities: [String],
  image: {
    type: String,
  },
  images: [String],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Room', roomSchema);
