const express = require('express');
const { accessChat, allUserChats, createGroupChat, renameGroupName, addUsersToGroup, removeUsersFromGroup } = require('../controller/chat');
const { isAuthenticated } = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/api/chat', isAuthenticated, accessChat);
router.get('/api/chat/all', isAuthenticated, allUserChats);
router.post('/api/chat/group', isAuthenticated, createGroupChat);
router.post('/api/chat/group/rename', isAuthenticated, renameGroupName);
router.post('/api/chat/group/add', isAuthenticated, addUsersToGroup);
router.delete('/api/chat/group/remove', isAuthenticated, removeUsersFromGroup);

module.exports = router;
