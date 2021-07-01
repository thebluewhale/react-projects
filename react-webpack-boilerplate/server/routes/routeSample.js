import express from 'express';
import Account from '../models/account';

const router = express.Router();

/* this is sample REST api */
router.post('/url', (req, res) => {
	Account.findOne({username:req.body.username}, (err, data) => {
		if(err) {
			throw err;
		} else if(data) {
			return res.status(400).json({
				error: 'USERNAME ALREADY EXISTS',
				code: 1
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

export default router;
