'use strict';

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// Register new User
module.exports.register = function(request, response) {
    let user = new User();
    user.email = request.body.email;
    user.name = request.body.name;
    user.setPassword(request.body.password);
    user.save(function(error) {
        if (error) {
            console.warn("Failed to create user " + user.email);
            response.sendStatus(404);
        } else {
            console.log("User " + user.email + " created");
            // Return token so the user can log in right away
            let jwt = user.createJWT();
            response.status(200).json({
                "token": jwt
            });
        }
    });
};

// Log in
module.exports.login = function(request, response) {
    // Use our local strategy
    passport.authenticate('local', function(error, user, msg) {
        // Log in fail
        if (error) {
            response.status(404).json(error);
            console.warn("User " + request.email + " failed to log in");
        }
        // Login success, respond with JWT
        if (user) {
            let jwt = user.createJWT();
            response.status(200);
            response.json({
                "token": jwt
            });
            console.log("User " + user.email + " logged in");
        } else {
            response.sendStatus(401);
        }
    })(request, response);
};
