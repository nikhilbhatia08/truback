const express = require('express');
const { saveResponse, getHistory, getSaved } = require('../controllers/chatController');

const router = express.Router();

router.post('/save', saveResponse).get('/history', getHistory).get('/saved', getSaved);

module.exports = router;
