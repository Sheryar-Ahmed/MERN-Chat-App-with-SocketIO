const express = require('express');
const { accessChat } = require('../controller/chat');
const { isAuthenticated } = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/api/chat', isAuthenticated, accessChat);

module.exports = router;
