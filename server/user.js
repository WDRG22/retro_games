const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {type: String, required: true, index: true, unique: true},
    username: {type: String, required: true, index: true, unique: true},
    password: {type: String},
});

// Add passport-local-mongoose plugin to handle password hashing and salting
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'username',
})

const User = mongoose.model('User', userSchema);

module.exports = User;