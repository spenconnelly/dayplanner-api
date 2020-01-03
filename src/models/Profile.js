const mongoose = require('mongoose');

const profileScheme = new mongoose.Schema ({
    email: String,
    createdDate: Date
});

module.exports =  mongoose.model('Profile', profileScheme);
