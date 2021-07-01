'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var Account = new Schema({
	username: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	bookmarks: {
		type: Array,
		default: [{ postingID: String, title: String }]
	},
	confirmed: {
		type: Boolean,
		default: false
	}
});

Account.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, 8);
};

Account.methods.validateHash = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('account', Account);