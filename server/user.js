const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

// Add passport-local-mongoose plugin to handle password hashing and salting
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'username',
})

const User = mongoose.model('User', userSchema);

module.exports = User;