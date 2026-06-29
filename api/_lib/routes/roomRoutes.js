const express = require('express');
const router = express.Router();
const { getRooms, getPublicRooms, getRoomBySlug, createRoom, updateRoom } = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');

router.get('/public', getPublicRooms);
router.get('/public/:slug', getRoomBySlug);
router.route('/').get(protect, getRooms).post(protect, createRoom);
router.route('/:id').put(protect, updateRoom);

module.exports = router;
