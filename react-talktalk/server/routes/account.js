import express from 'express';
import Account from '../models/account';

const router = express.Router();

router.post('/register', (req, res) => {
	let newUsername = req.body.username;
	let newPassword = req.body.password;
	let newEmail = req.body.email;

	if((typeof newUsername !== 'string') || (newUsername.length < 4)) {
		return res.status(400).json({
			error: 'BAD USERNAME',
			code: 1
		});
	} else if((typeof newPassword !== 'string') || (newPassword.length < 4)) {
		return res.status(400).json({
			error: 'BAD PASSWORD',
			code: 2
		});
	} else if((typeof newEmail !== 'string') || newEmail === '') {
		return res.status(400).json({
			error: 'BAD EMAIL',
			code: 3
		});
	}

	Account.findOne({username: newUsername}, (err, data) => {
		if(err) {
			throw err;
		} else if(data) {
			return res.status(400).json({
				error: 'USERNAME ALREADY EXIST',
				code: 4
			});
		} else {
			let newAccount = new Account({
				username: newUsername,
				password: newPassword,
				email: newEmail
			});
			newAccount.password = newAccount.generateHash(newAccount.password);
			newAccount.save((err) => {
				if(err) {
					throw err;
				} else {
					return res.json({
						success: true
					});
				}
			});
		}
	});
});

router.post('/login', (req, res) => {
	if((typeof req.body.username !== 'string') || (req.body.username === '')) {
		return res.status(400).json({
			error: 'INVALID USERNAME',
			code: 1
		});
	}

	Account.findOne({username: req.body.username}, (err, data) => {
		if(err) {
			throw err;
		} else if(!data) {
			return res.status(401).json({
				error: 'USERNAME NOT EXIST',
				code: 2
			});
		} else if(!data.validateHash(req.body.password)) {
			return res.status(401).json({
				error: 'INVALID PASSWORD',
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
		if(err) {
			throw err;
		}
	});
	return res.json({
		success: true
	});
});

router.get('/search/:keyword', (req, res) => {
	let keyword = req.params.keyword;
	let re = new RegExp('^' + keyword);
	Account.find({username: {$regex: re}}, {_id: false, username: true})
	//Account.find({username: keyword}, {_id: false, username: true})
	.limit(6)
	.sort({username: 1})
	.exec((err, data) => {
		if(err) {
			throw err;
		} else {
			res.json(data);
		}
	});
});

router.get('/getinfo', (req, res) =>{
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
