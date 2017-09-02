'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.getProfile = function(request, response){
    if (!request.payload._id) {
        response.status(401).json({
            "message": "UnauthorizedError: no ID"
        });
    } else {
        User.findById(request.payload._id)
            .exec(function(error, user) {
                response.status(200).json(user);
            });
    }
}
