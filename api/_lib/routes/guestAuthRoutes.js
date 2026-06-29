const express = require('express');
const router = express.Router();
const { registerGuest, loginGuest, updateProfile, getMe } = require('../controllers/guestAuthController');
const { protectGuest } = require('../middleware/guestAuthMiddleware');

router.post('/register', registerGuest);
router.post('/login', loginGuest);
router.get('/me', protectGuest, getMe);
router.put('/profile', protectGuest, updateProfile);

module.exports = router;
