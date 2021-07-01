import express from 'express';
import Account from '../models/account';

const router = express.Router();

router.post('/signup', (req, res) => {
	let usernameRegex = /^[a-z0-9]+$/;
	let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;
	if(!usernameRegex.test(req.body.username)) {
		return res.status(400).json({
			error: "BAD USERNAME",
			code: 1
		});
	} else if(req.body.password.length < 4 || typeof req.body.password !== 'string') {
		return res.status(400).json({
			error: "BAD PASSWORD",
			code: 2
		});
	} else if(!emailRegex.test(req.body.email)) {
		return res.status(400).json({
			error: "BAD EMAIL",
			code: 3
		});
	}

	Account.findOne({username:req.body.username}, (err, data) => {
		if(err) {
			throw err;
		} else if(data) {
			return res.status(400).json({
				error: "USERNAME ALREADY EXISTS",
				code: 4
			});
		} else {
			let newAccount = new Account({
				username: req.body.username,
				password: req.body.password,
				email: req.body.email
			});
			newAccount.password = newAccount.generateHash(newAccount.password);
			newAccount.save((err) => {
				if(err) throw err;
				return res.json({success: true});
			});
		}
	});
});

router.post('/signin', (req, res) => {
	if(typeof req.body.password !== 'string') {
		return res.status(401).json({
			error: "LOGIN FAILED",
			code: 1
		});
	}

	Account.findOne({username: req.body.username}, (err, data) => {
		if(err) {
			throw err;
		} else if(!data) {
			return res.status(401).json({
				error: "LOGIN FAILED",
				code: 1
			});
		} else if(!data.validateHash(req.body.password)) {
			return res.status(401).json({
				error: "LOGIN FAILED",
				code: 1
			});
		} else {
			let session = req.session;
			session.loginInfo = {
				_id: data._id,
				username: data.username
			};
			return res.json({
				success: true,
				accountData: data
			});
		}
	});
});

router.post('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err) throw err;
	});
	return res.json({success: true});
});

router.get('/getInfo', (req, res) => {
	if(typeof req.session.loginInfo === 'undefined') {
		return res.status(401).json({
			error: 1
		});
	} else {
		Account.findOne({username: req.session.loginInfo.username}, (err, data) => {
			if(err) {
				throw err;
			} else {
				return res.json({
					info: req.session.loginInfo,
					accountData: data
				});
			}
		});
	}
});

router.post('/savechange', (req, res) => {
	let ePassword = req.body.existingPassword;
	let nPassword = req.body.newPassword;
	let nEmail = req.body.newEmail;
	let username = req.body.username;
	let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;

	if(typeof req.session.loginInfo === 'undefined') {
		return res.status(401).json({
			error: 'Not logged in',
			code: 1
		});
	} else if((typeof ePassword !== 'string') || (typeof nPassword !== 'string')) {
		return res.status(400).json({
			error: 'Bad Password',
			code: 2
		});
	} else if(nPassword.length < 4) {
		return res.status(400).json({
			error: 'Bad Password',
			code: 2
		});
	} else if(!emailRegex.test(nEmail)) {
		console.log(nEmail);
		return res.status(400).json({
			error: "BAD EMAIL",
			code: 3
		});
	} else {
		Account.findOne({username: username}, (err, data) => {
			if(err) {
				throw err;
			} else if(!data) {
				return res.status(401).json({
					error: "No such data",
					code: 4
				});
			} else if(!data.validateHash(ePassword)) {
				return res.status(401).json({
					error: "Invalid password",
					code: 5
				});
			} else {
				data.password = data.generateHash(nPassword);
				data.email = nEmail;
				data.save((err, data) => {
					if(err) throw err;
					return res.json({
						success: true,
						data
					});
				});
			}
		});
	}
});

export default router;
