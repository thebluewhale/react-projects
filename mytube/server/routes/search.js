import express from 'express';
import Account from '../models/account';

const router = express.Router();

router.get('/user/:username', (req, res) => {
	let username = req.params.username;
	let re = new RegExp('^' + username);
	Account.find({username: {$regex: re}}, {_id: false, username: true})
	.limit(10)
	.sort({username: 1})
	.exec((err, data) => {
		if(err) throw err;
		res.json({
			success: true,
			searchResult: data
		});
	});
});

export default router;
