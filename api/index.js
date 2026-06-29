const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./_lib/config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.send('LuxuryStay API is running...');
});

// Auth Routes
app.use('/api/auth', require('./_lib/routes/authRoutes'));

// Guest Routes
app.use('/api/guests', require('./_lib/routes/guestRoutes'));

// Room Routes
app.use('/api/rooms', require('./_lib/routes/roomRoutes'));

// Reservation Routes
app.use('/api/reservations', require('./_lib/routes/reservationRoutes'));

// Guest portal auth
app.use('/api/guest-auth', require('./_lib/routes/guestAuthRoutes'));

// Feedback & service requests
app.use('/api/feedback', require('./_lib/routes/feedbackRoutes'));
app.use('/api/service-requests', require('./_lib/routes/serviceRequestRoutes'));

// Payments
app.use('/api/payments', require('./_lib/routes/paymentRoutes'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

module.exports = app;
