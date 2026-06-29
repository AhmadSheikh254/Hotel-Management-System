const express = require('express');
const router = express.Router();
const { submitServiceRequest, getMyServiceRequests } = require('../controllers/serviceRequestController');
const { protectGuest } = require('../middleware/guestAuthMiddleware');

router.post('/', submitServiceRequest);
router.post('/public', submitServiceRequest);
router.get('/my', protectGuest, getMyServiceRequests);

module.exports = router;
