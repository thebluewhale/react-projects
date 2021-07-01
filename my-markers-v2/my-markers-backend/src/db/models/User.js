const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const privateKey = require('../../private/private');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    created: {
        type: Date,
        default: Date.now
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, privateKey.BCRYPT_HASH_SALT);
};

UserSchema.methods.verify = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = mongoose.model('User', UserSchema);