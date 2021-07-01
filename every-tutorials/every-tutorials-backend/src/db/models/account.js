const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const Account = new Schema({
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
		default: [{postingID: String, title: String}]
	},
	confirmed: {
		type: Boolean,
		default: false
	}
});

Account.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, 8);
};

Account.methods.validateHash = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('account', Account);
