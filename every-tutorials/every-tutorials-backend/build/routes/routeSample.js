'use strict';

var express = require('express');
var Account = require('../db/models/account');

var router = express.Router();

/* this is sample REST api */
router.post('/url', function (req, res) {
	Account.findOne({ username: req.body.username }, function (err, data) {
		if (err) {
			throw err;
		} else if (data) {
			return res.status(400).json({
				error: 'USERNAME ALREADY EXISTS',
				code: 1
			});
		} else {
			var newAccount = new Account({
				username: req.body.username,
				password: req.body.password,
				email: req.body.email
			});
			newAccount.password = newAccount.generateHash(newAccount.password);
			newAccount.save(function (err) {
				if (err) throw err;
				return res.json({ success: true });
			});
		}
	});
});

module.exports = router;