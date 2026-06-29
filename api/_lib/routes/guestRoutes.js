const express = require('express');
const router = express.Router();
const { getGuests, createGuest, updateGuest } = require('../controllers/guestController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGuests).post(protect, createGuest);
router.route('/:id').put(protect, updateGuest);

module.exports = router;
