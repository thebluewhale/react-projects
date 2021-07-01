'use strict';

var mongoose = require('mongoose');

module.exports = function () {
	function connect() {
		mongoose.connect('mongodb://localhost:27017/tutorials', function (err) {
			if (err) {
				console.error('mongodb connection error', err);
			}
			console.log('mongodb connected successfully');
		});
	}
	connect();
	mongoose.connection.on('disconnected', connect);
};