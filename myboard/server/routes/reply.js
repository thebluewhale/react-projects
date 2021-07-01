import express from 'express';
import mongoose from 'mongoose';
import Memo from '../models/memo';

const router = express.Router();

router.put('/:actionType/:id', (req, res) => {
	if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({
			error: "INVALID ID",
			code: 1
		});
	} else if(req.params.actionTypee === 'post' &&
				(typeof req.body.contents !== 'string' || req.body.contents === '')) {
		return res.status(400).json({
			error: "THERE IS NO CONTENTS",
			code: 2
		});
	} else if(typeof req.session.loginInfo === 'undefined') {
		return res.status(403).json({
			error: "NOT LOGGED IN",
			code: 3
		});
	} else {
		Memo.findById(req.params.id, (err, data) => {
			if(err) {
				throw err;
			} else if(!data) {
				return res.status(400).json({
					error: "NO MEMO",
					code: 4
				});
			} else {
				if(req.params.actionType === 'post') {
					let newReply = {
						writer: req.session.loginInfo.username,
						contents: req.body.contents
					};
					data.reply.push(newReply);
				} else if(req.params.actionType === 'remove') {
					data.reply.splice(req.body.replyIndex, 1);
				} else {
					return res.status(400).json({
						error: "INVALID ACTION",
						code: 5
					});
				}

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
