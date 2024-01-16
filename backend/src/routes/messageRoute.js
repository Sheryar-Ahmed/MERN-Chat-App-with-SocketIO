const express = require('express');
const { isAuthenticated } = require('../middleware/authmiddleware');
const { messageCreation, allMessagesChat } = require('../controller/message');
const router = express.Router();

router.post('/api/message', isAuthenticated, messageCreation);
router.get('/api/messages/:chatId', isAuthenticated, allMessagesChat);


module.exports = router;
