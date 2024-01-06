const express = require('express');
const { accessChat, allUserChats } = require('../controller/chat');
const { isAuthenticated } = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/api/chat', isAuthenticated, accessChat);
router.get('/api/chat/all', isAuthenticated, allUserChats);

module.exports = router;
