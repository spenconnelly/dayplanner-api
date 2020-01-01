const mongoose = require('mongoose');

const profileScheme = new mongoose.Schema ({
    email: String
});

const Profile = mongoose.model('Profile', profileScheme);

module.exports = Profile;
