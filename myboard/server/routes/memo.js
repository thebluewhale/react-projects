import express from 'express';
import mongoose from 'mongoose';
import Memo from '../models/memo';

const router = express.Router();

router.post('/', (req, res) => {
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
		let newMemo = new Memo({
			writer: req.session.loginInfo.username,
			contents: req.body.contents
		});
		newMemo.save((err) => {
			if(err) throw err;
			return res.json({success: true});
		});
	}
});

router.put('/:id', (req, res) => {
	if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({
			error: "INVALID ID",
			code: 1
		});
	} else if(typeof req.body.contents !== 'string' || req.body.contents === '') {
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
			} else if(data.writer !== req.session.loginInfo.username) {
				return res.status(403).json({
					error: "NO PERMISSION",
					code: 5
				});
			} else {
				data.contents = req.body.contents;
				data.date.edited = new Date();
				data.is_edited = true;

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

router.delete('/:id', (req, res) => {
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
		Memo.findById(req.params.id, (err, data) => {
			if(err) {
				throw err;
			} else if(!data) {
				return res.status(404).json({
					error: "NO MEMO",
					code: 3
				});
			} else if(data.writer !== req.session.loginInfo.username) {
				return res.status(403).json({
					error: "NO PERMISSION",
					code: 4
				});
			} else {
				Memo.remove({_id: req.params.id}, (err) => {
					if(err) throw err;
					return res.json({success: true});
				});
			}
		});
	}
});

router.get('/', (req, res) => {
	Memo.find()
	.sort({'_id': -1})
	.limit(6)
	.exec((err, memos) => {
		if(err) throw err;
		res.json(memos);
	});
});

router.get('/:listType/:id', (req, res) => {
	let listType = req.params.listType;
	let id = req.params.id;

	if(listType !== 'old' && listType !== 'new') {
		return res.status(400).json({
			error: 'INVALID LISTTYPE',
			code: 1
		});
	}

	if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			error: 'INVALID ID',
			code: 2
		});
	}

	let objId = mongoose.Types.ObjectId(req.params.id);
	if(listType === 'new') {
		Memo.find({_id: {$gt: objId}})
		.sort({_id: -1})
		.limit(6)
		.exec((err, datas) => {
			if(err) throw err;
			return res.json(datas);
		});
	} else {
        Memo.find({_id: {$lt: objId}})
        .sort({_id: -1})
        .limit(6)
        .exec((err, datas) => {
            if(err) throw err;
            return res.json(datas);
        });
	}
});

router.post('/star/:id', (req, res) => {
	if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({
			error: 'INVALID ID',
			code: 1
		});
	} else if(typeof req.session.loginInfo === 'undefined') {
		return res.status(403).json({
			error: 'NOT LOGGED IN',
			code: 2
		});
	} else {
		Memo.findById(req.params.id, (err, data) => {
			if(err) throw err;
			if(!data) {
				return res.status(404).json({
					error: 'NO RESOURCE',
					code: 3
				});
			}

			let index = data.starred.indexOf(req.session.loginInfo.username);
			let hasStarred = (index === -1) ? false : true;
			if(hasStarred) {
				data.starred.splice(index, 1);
			} else {
				data.starred.push(req.session.loginInfo.username);
			}

			data.save((err, data) => {
				if(err) throw err;
				res.json({
					success: true,
					'has_starred': !hasStarred,
					data
				});
			});
		});
	}
});

router.get('/:username', (req, res) => {
	Memo.find({writer: req.params.username})
	.sort({_id: -1})
	.limit(6)
	.exec((err, datas) => {
		if(err) throw err;
		res.json(datas);
	});
});

router.get('/:username/:listType/:id', (req, res) => {
	let listType = req.params.listType;
	let id = req.params.id;

	if(listType !== 'old' && listType !== 'new') {
		return res.status(400).json({
			error: 'INVALID LISTTYPE',
			code: 1
		});
	}

	if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			error: 'INVALID ID',
			code: 2
		});
	}

	let objId = mongoose.Types.ObjectId(id);
	if(listType === 'new') {
		Memo.find({writer: req.params.username, _id: {$gt: objId}})
		.sort({_id: -1})
		.limit(6)
		.exec((err, datas) => {
			if(err) throw err;
			res.json({datas});
		});
	} else {
		Memo.find({writer: req.params.username, _id: {$lt: objId}})
		.sort({_id: -1})
		.limit(6)
		.exec((err, datas) => {
			if(err) throw err;
			res.json({datas});
		});
	}
});

export default router;
