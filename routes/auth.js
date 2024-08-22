const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', signup);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', login);

module.exports = router;
