'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

// This is called when we use passport.authenticate();
passport.use(new LocalStrategy({
        // Our email is our username
        usernameField: 'email'
    },
    function(username, password, done) {
        User.findOne({email: username}, function(error, user) {
            if (error) {
                return done(error);
            }
            if (!user) {
                return done(null, false, {
                    message: "User not found"
                });
            }
            // We can call methods on MongoDB objects
            // Check credentials
            if (!user.checkPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password"
                });
            }
            return done(null, user);
        });
    }
));
