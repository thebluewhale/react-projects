import nodemailer from 'nodemailer';
import crypto from 'crypto';
const express = require('express');
const Account = require('../db/models/account');
const Posting = require('../db/models/posting');

const router = express.Router();
const mailID = 'beat410';
const mailPW = 'promagic2848';
const mailFrom = 'beat410@google.com';
const mailTitle = '가입 확인 메일입니다.';
const mailConfirmLink = `localhost:8080/accountconfirm/`;
const mailConfirmText = '여기를 눌러서 가입을 완료해주세요';
const mailConfirmTimelimitText = '위 링크는 한시간 동안 유효합니다.';

router.post('/login', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	Account.findOne({username: username}, (err, data) => {
		if (err) {
			throw err;
		} else if (!data) {
			return res.status(401).json({
				// username not exists
				errorCode: 1
			});
		} else if (!data.validateHash(password)) {
			return res.status(401).json({
				// wrong password
				errorCode: 2
			});
		} else if (!data.confirmed) {
			return res.status(401).json({
				// not confirmed
				errorCode: 3
			});
		} else {
			req.session.loginInfo = {
				username: username,
				isLoggedIn: true
			};
			req.session.save();
			return res.status(200).json({
				success: true
			});
		}
	});
});

router.get('/signup/confirm/:username/:confirmHash', (req, res) => {
	let username = req.params.username;
	let confirmHash = req.params.confirmHash;

	let hashedUsername = crypto.createHash('sha256').update(username, 'utf8').digest('hex');
	if (hashedUsername === confirmHash) {
		Account.findOne({username: username}, (error, data) => {
			if (error) {
				throw error;
			} else if (!data) {
				res.status(401).json({
					success: false
				});
			} else {
				data.confirmed = true;
				data.save((error) => {
					if (error) {
						throw error;
					} else {
						res.status(200).json({
							success: true
						});
					}
				});
			}
		});
	} else {
		res.status(401).json({
			success: false
		});
	}
});

router.post('/signup/temp', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email;

	// TO-BE : username, password test should be added
	Account.findOne({username: username}, (error, data) => {
		if (error) {
			throw error;
		} else if (data) {
			return res.status(400).json({
				// duplicated username
				errorCode: 1
			});
		} else {
			let newAccount = new Account({
				username: username,
				password: password,
				email: email,
				created: new Date(),
				confirmed: false
			});
			newAccount.password = newAccount.generateHash(newAccount.password);
			newAccount.save((error) => {
				if (error) {
					throw error;
				} else {
					let transporter = nodemailer.createTransport({
						host: 'smtp.gmail.com',
						service: 'google',
						auth: {
							user: mailID,
							pass: mailPW
						}
					});
					let hashvalue = crypto.createHash('sha256').update(username, 'utf8').digest('hex');
					let mailConfirmHTML = `<a href=${mailConfirmLink+username+'/'+hashvalue}>${mailConfirmText}</a>`;
					mailConfirmHTML += `<div>${mailConfirmTimelimitText}</div>`;
					let mailOption = {
						from: mailFrom,
						to: 'beat410@naver.com',
						subject: mailTitle,
						html: mailConfirmHTML
					};
					transporter.sendMail(mailOption, (error, info) => {
						if (error) {
							console.log(error);
							return res.status(401).json({
								success: false
							});
						} else {
							setTimeout(() => {
								Account.findOne({username: username}, (error, data) => {
									if (data && !data.confirmed) {
										data.remove();
									}
								});
							}, 1000 * 60 * 60);
							return res.status(200).json({
								success: true
							});
						}
					});
				}
			});
		}
	});
});

router.get('/getinfo', (req, res) => {
	let resData = {
		accountData: {},
		postingData: {}
	};
	let username = '';

	if (typeof req.session.loginInfo === 'undefined') {
		return res.status(401).json({
			success: false
		});
	}

	username = req.session.loginInfo.username;
	Account.findOne({username: username}, (error, data) => {
		if (error) {
			throw error;
		} else {
			if (data) {
				resData.accountData = data;
				Posting.find({$and: [{author: username}, {saveStatus: 'TEMP'}]}, (error, data) => {
					if (error) {
						throw error;
					} else {
						if (data) {
							resData.postingData.haveTempData = true;
						}
						return res.status(200).json({
							success: true,
							data: resData
						});
					}
				});
			} else {
				return res.status(401).json({
					success: false
				});
			}
		}
	});
});

router.post('/hasBookmarked', (req, res) => {
	if (typeof req.session.loginInfo === 'undefined') {
		return res.status(401).json({
			success: false
		});
	}

	let id = req.body.postingID;
	let title = req.body.postingTitle;
	let username = req.session.loginInfo.username;
	console.log(id, title);

	Account.findOne({username: username}, (error, data) => {
		if (error) {
			throw error;
		} else {
			if (data) {
				let candidateData = {postingID: id, title: title};
				let index = data.bookmarks.map(function(e) { return e.postingID; }).indexOf(id);
				let hasBookmarked = (index == -1) ? false : true;
				return res.status(200).json({
					success: true,
					data: hasBookmarked
				});
			} else {
				res.status(401).json({
					success: false
				});
			}
		}
	});
});

router.post('/manageBookmarks', (req, res) => {
	if (typeof req.session.loginInfo === 'undefined') {
		console.log('session not exists');
		return res.status(401).json({
			success: false
		});
	}

	let id = req.body.postingID;
	let title = req.body.postingTitle;
	let username = req.session.loginInfo.username;

	Account.findOne({username: username}, (error, data) => {
		if (error) {
			throw error;
		} else {
			if (data) {
				let candidateData = {postingID: id, title: title};
				let index = data.bookmarks.map(function(e) { return e.postingID; }).indexOf(id);
				let hasBookmarked = (index == -1) ? false: true;
				if (hasBookmarked) {
					data.bookmarks.splice(index, 1);
				} else {
					data.bookmarks.push(candidateData);
				}
				console.log(data.bookmarks);
				data.save();
				return res.status(200).json({
					success: true
				});
			} else {
				console.log('username data not exists');
				res.status(401).json({
					success: false
				});
			}
		}
	});
});

router.get('/getbookmarks', (req, res) => {
	if (typeof req.session.loginInfo === 'undefined') {
		console.log('session not exists');
		return res.status(401).json({
			success: false
		});
	}

	let username = req.session.loginInfo.username;

	Account.findOne({username: username}, (error, data) => {
		if (error) {
			throw error;
		} else {
			if (data) {
				return res.status(200).json({
					success: true,
					data: data.bookmarks
				});
			} else {
				res.status(401).json({
					success: false
				});
			}
		}
	});
});

router.post('/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			throw error;
		} else {
			return res.status(200).json({
				success: true
			});
		}
	});
});

module.exports = router;
