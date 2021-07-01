import express from 'express';
import Account from '../models/account';

const router = express.Router();

router.post('/register', (req, res) => {
	let usernameRegex = /^[a-z0-9]+$/;
	let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;
	if(!usernameRegex.test(req.body.username)) {
		return res.status(400).json({
			error: 'BAD USERNAME',
			code: 1
		});
	} else if(req.body.password.length < 4 || typeof req.body.password !== 'string') {
		return res.status(400).json({
			error: 'BAD PASSWORD',
			code: 2
		});
	} else if(!emailRegex.test(req.body.email)) {
		return res.status(400).json({
			error: 'BAD EMAIL',
			code: 3
		});
	}

	Account.findOne({username:req.body.username}, (err, data) => {
		if(err) {
			throw err;
		} else if(data) {
			return res.status(400).json({
				error: 'USERNAME ALREADY EXISTS',
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

router.post('/login', (req, res) => {
	if(typeof req.body.password !== 'string') {
		return res.status(401).json({
			error: 'INVALID PASSWORD',
			code: 1
		});
	}

	Account.findOne({username: req.body.username}, (err, data) => {
		if(err) {
			throw err;
		} else if(!data) {
			return res.status(401).json({
				error: 'ID NOT EXIST',
				code: 2
			});
		} else if(!data.validateHash(req.body.password)) {
			return res.status(401).json({
				error: 'WRONG PASSWORD',
				code: 3
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

export default router;
