const express = require('express');
const { login, register, currentUserInfo } = require('../controller/auth');

const router = express.Router();

router.post('/api/users/register', register);
router.post('/api/users/login', login);
router.post('/api/users/me', currentUserInfo);

module.exports = router;
