const express = require('express');
const { login, register, currentUserInfo, allUsers } = require('../controller/auth');
const { isAuthenticated } = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/api/users/register', register);
router.post('/api/users/login', login);
router.get('/api/users/me', isAuthenticated, currentUserInfo);
router.get('/api/users/allUsers', isAuthenticated, allUsers);

module.exports = router;
