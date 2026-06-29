const express = require('express');
const router = express.Router();
const {
  getReservations, getMyReservations, createReservation,
  createPublicReservation, updateReservation,
} = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');
const { protectGuest } = require('../middleware/guestAuthMiddleware');

router.post('/public', createPublicReservation);
router.get('/my', protectGuest, getMyReservations);
router.route('/').get(protect, getReservations).post(protect, createReservation);
router.route('/:id').put(protect, updateReservation);

module.exports = router;
