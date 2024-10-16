const express = require('express');
const { groqController } = require('../controllers/groqController');

const router = express.Router();

router.post('/question', groqController);

module.exports = router;
