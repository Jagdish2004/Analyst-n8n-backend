const router = require('express').Router();
const { fetchHistory, fetchChatHistory, createSession, newChat } = require('../controllers/fetchDetail');


// Don’t call the functions here, just reference them
router.get('/history', fetchHistory);
router.get('/:sessionId/history', fetchChatHistory);
router.post('/new-session', createSession);
router.post('/:sessionId/newChat', newChat);

module.exports = router;
