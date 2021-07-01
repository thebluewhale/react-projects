import express from 'express';
import Chat from '../models/chat';
import Account from '../models/account';

const router = express.Router();

router.post('/send/:from/:to', (req, res) => {
	let chatFrom = req.params.from;
	let chatTo = req.params.to;

	if((typeof chatFrom !== 'string') || (chatFrom === '')) {
		return res.status(400).json({
			error: 'NOT LOGGED IN',
			code: 1
		});
	} else if((typeof req.body.contents !== 'string') || (req.body.contents === '')) {
		return res.status(400).json({
			error: 'NO MESSAGE TO SEND',
			code: 2
		});
	}

	Account.findOne({username: chatFrom}, (err, data) => {
		if(err) {
			throw err;
		} else if(!data) {
			return res.status(400).json({
				error: 'INVALID SENDER NAME',
				code: 3
			});
		} else {
			if(data.chatList.indexOf(chatTo) === -1) {
				data.chatList.unshift(chatTo);
			} else {
				data.chatList.splice(data.chatList.indexOf(chatTo), 1);
				data.chatList.unshift(chatTo);
			}
			data.save((err) => {
				if(err) throw err;
			});
		}
	});

	Account.findOne({username: chatTo}, (err, data) => {
		if(err) {
			throw err;
		} else if(!data) {
			return res.status(400).json({
				error: 'INVALID PARTNER NAME',
				code: 3
			});
		} else {
			if(data.chatList.indexOf(chatFrom) === -1) {
				data.chatList.push(chatFrom);
			} else {
				data.chatList.splice(data.chatList.indexOf(chatFrom), 1);
				data.chatList.unshift(chatFrom);
			}
			data.save((err) => {
				if(err) throw err;
			});
		}
	});

	let newChat = new Chat({
		from: chatFrom,
		to: chatTo,
		contents: req.body.contents,
		isRead: false,
	});
	newChat.save((err) => {
		if(err) {
			throw err;
		} else {
			return res.json({
				success: true
			});
		}
	});
});

router.get('/message/:me/:partner/:isInitial/:id', (req, res) => {
	//let currentUser = req.session.loginInfo.username;
	let currentUser = req.params.me;
	let currentPartner = req.params.partner;
	let isInitial = req.params.isInitial;
	let objId = req.params.id;

	if(isInitial === 'true') {
		Chat.find({"$or" : [{from:currentUser, to:currentPartner}, {from:currentPartner, to: currentUser}]})
		.sort({_id: 1})
		.exec((err, data) => {
			if(err) {
				throw err;
			} else if(!data.length){
				res.json({
					success: false
				});
			} else {
				res.json({
					success: true,
					data
				});
			}
		});
	} else {
		Chat.find({"$or" : [{from:currentUser, to:currentPartner}, {from:currentPartner, to: currentUser}], _id: {$gt: objId}})
		.sort({_id: 1})
		.exec((err, data) => {
			if(err) {
				throw err;
			} else if(!data.length) {
				res.json({
					success: false
				});
			} else {
				res.json({
					success: true,
					data
				});
			}
		});
	}
});

router.get('/list/:username', (req, res) => {
	let username = req.params.username;
	Account.findOne({username: username}, (err, data) => {
		if(err) {
			throw err;
		} else if(!data) {
			res.json({
				success: false
			});
		} else {
			res.json({
				success: true,
				data: data.chatList
			});
		}
	});
});

export default router;
