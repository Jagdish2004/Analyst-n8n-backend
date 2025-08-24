const router = require('express').Router();
const { fetchHistory, fetchChatHistory } = require('../controllers/fetchDetail');

// Don’t call the functions here, just reference them
router.get('/history', fetchHistory);
router.get('/:sessionId/history', fetchChatHistory);

module.exports = router;
