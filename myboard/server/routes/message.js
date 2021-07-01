import express from 'express';
import mongoose from 'mongoose';
import Message from '../models/message';

const router = express.Router();

router.post('/send/:to', (req, res) => {
	if(typeof req.session.loginInfo === 'undefined') {
		return res.status(403).json({
			error: "NOT LOGGED IN",
			code: 1
		});
	} else if(typeof req.body.contents !== 'string' || req.body.contents === '') {
		return res.status(400).json({
			error: "THERE IS NO CONTENTS",
			code: 2
		});
	} else {
		let newMessage = new Message({
			from: req.session.loginInfo.username,
			to: req.params.to,
			contents: req.body.contents
		});
		newMessage.save((err) => {
			if(err) throw err;
			return res.json({success: true});
		});
	}
});

router.get('/read/:username', (req, res) => {
	Message.find({to: req.params.username})
	.sort({'_id': -1})
	.exec((err, messages) => {
		if(err) throw err;
		res.json(messages);
	});
});

router.delete('/remove/:id', (req, res) => {
	if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({
			error: "INVALID ID",
			code: 1
		});
	} else if(typeof req.session.loginInfo === 'undefined') {
		return res.status(403).json({
			error: "NOT LOGGED IN",
			code: 2
		});
	} else {
		Message.findById(req.params.id, (err, data) => {
			if(err) {
				throw err;
			} else if(!data) {
				return res.status(404).json({
					error: "NO MESSAGE",
					code: 3
				});
			} else if(data.to !== req.session.loginInfo.username) {
				return res.status(403).json({
					error: "NO PERMISSION",
					code: 4
				});
			} else {
				Message.remove({_id: req.params.id}, (err) => {
					if(err) throw err;
					return res.json({success: true});
				});
			}
		});
	}
});


export default router;
