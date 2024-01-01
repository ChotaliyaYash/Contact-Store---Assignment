// package imports
const express = require('express');

// file imports
const { signup, login, logout } = require('../controller/userController.js');

const router = express.Router();

// router

// signup
// link       /api/auth/signup
// access     public
router.route('/signup').post(signup);

// login
// link       /api/auth/login
// access     public
router.route('/login').post(login);

// logout
// link       /api/auth/logout
// access     public
router.route('/logout').get(logout);

module.exports = router;