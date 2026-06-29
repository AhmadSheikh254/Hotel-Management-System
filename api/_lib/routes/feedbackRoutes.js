const express = require('express');
const router = express.Router();
const { getFeedback, submitFeedback } = require('../controllers/feedbackController');

router.get('/', getFeedback);
router.post('/', submitFeedback);

module.exports = router;
