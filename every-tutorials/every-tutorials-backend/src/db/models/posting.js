const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Posting = new Schema({
	author: {
		type: String,
		trim: true
	},
	category: {
		type: String,
		trim: true
	},
	title: {
		type: String,
		trim: true
	},
	contents: {
		type: String,
		trim: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	saveStatus: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('posting', Posting);
