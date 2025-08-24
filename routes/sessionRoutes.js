const router = require('express').Router();
const { fetchHistory, fetchSessionHistory } = require('../controllers/fetchDetail');

// Don’t call the functions here, just reference them
router.get('/history', fetchHistory);
router.get('/:sessionId/history', fetchSessionHistory);

module.exports = router;
