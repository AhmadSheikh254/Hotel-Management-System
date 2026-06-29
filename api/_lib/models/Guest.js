const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const guestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  idType: {
    type: String,
    enum: ['Passport', 'National ID', 'Driver License', 'Pending'],
    default: 'Pending',
  },
  idNumber: {
    type: String,
    default: 'PENDING',
  },
  status: {
    type: String,
    enum: ['Active', 'Checked Out', 'Blacklisted'],
    default: 'Active',
  },
}, {
  timestamps: true,
});

guestSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return bcrypt.compare(enteredPassword, this.password);
};

guestSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    next();
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Guest', guestSchema);
