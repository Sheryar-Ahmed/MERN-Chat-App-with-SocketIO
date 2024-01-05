const express = require('express');
const { login, register, currentUserInfo, allUsers } = require('../controller/auth');

const router = express.Router();

router.post('/api/users/register', register);
router.post('/api/users/login', login);
router.post('/api/users/me', currentUserInfo);
router.get('/api/users/allUsers', allUsers);

module.exports = router;
