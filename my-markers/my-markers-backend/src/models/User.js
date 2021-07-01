const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const PRIVATE_CONFIG = require('../../configs/private');
const CRYPTO_SECRET_KEY = PRIVATE_CONFIG.CRYPTO_SECRET_KEY;

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
    return bcrypt.hashSync(password, 8);
};

UserSchema.methods.verify = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

global.User = global.User || mongoose.model('User', UserSchema);
module.exports = global.User;