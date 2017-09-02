'use strict';

const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();
// JWT is secured with a local ENV
const jwt_secret = process.env.JWT_SECRET;
// Check the JWT before accessing API
const auth = jwt({
    secret: jwt_secret,
    // The user's info will be in request.payload
    userProperty: 'payload'
});

const api_auth = require('../controllers/authentication.js');
const profile = require('../controllers/profile.js');
// Unprotected endpoints
router.post('/register', api_auth.register);
router.post('/login', api_auth.login);

// Protected API endpoints
router.post('/profile', auth, profile.getProfile);

module.exports = router;
