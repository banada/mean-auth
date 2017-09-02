'use strict';

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');

let app = express();
const db = 'mongodb://localhost/auth';
const port = 3000;

require('./api/models/users.js');
require('./api/config/passport_config.js');

// MongoDB
mongoose.connect(db);
mongoose.connection.on('connected', function() {
    console.log("Connected to " + db);
});

/*
   Middleware
*/

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyparser.json({limit: '25mb'}));
app.use(passport.initialize());

// Fix CORS
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// API routes
const api_routes = require('./api/routes/api_routes.js');
app.use('/api', api_routes);
app.get('/*', function(request, response) {
    response.sendFile(path.join(__dirname, 'client/index.html'));
});

// Error handling
app.use(function(error, request, response, next) {
    if (error) {
        console.error(error);
    }
});

// Incorrect JWT
app.use(function(error, request, response, next) {
    if (error.name === 'UnauthorizedError') {
        response.status(401);
        response.json({"message": error.name + ": " + error.message});
    }
});

// HTTPS
const config = {
    key: fs.readFileSync('./certs/nc-key.pem'),
    cert: fs.readFileSync('./certs/nc-cert.pem')
}

// Start server
https.createServer(config, app).listen(port, function() {
    console.log("App has started on port " + port);
});
