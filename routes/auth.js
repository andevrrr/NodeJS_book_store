const express = require('express');

const router = express();

const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);

router.post('/login');

router.get('/signup', authController.getSignup);

router.post('/signup');

module.exports = router;