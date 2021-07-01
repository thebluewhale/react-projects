import express from 'express';
import mongoose from 'mongoose';
import Posting from '../models/posting';

const router = express.Router();

router.get('/', (req, res) => {
	Posting.find({})
	.sort({_id: -1})
	.limit(40)
	.exec((err, datas) => {
		if(err) throw err;
		res.json(datas);
	});
});

router.get('/:lastId', (req, res) => {
	let lastId = req.params.lastId;
	if(!mongoose.Types.ObjectId.isValid(lastId)) {
		return res.status(400).json({
			error: 'INVALID ID'
		});
	}

	let objId = mongoose.Types.ObjectId(lastId);
	Posting.find({_id: {$lt: objId}})
	.sort({_id: -1})
	.limit(40)
	.exec((err, datas) => {
		if(err) throw err;
		res.json(datas);
	});
});

router.get('/search/:keyword', (req, res) => {
	let keyword = req.params.keyword;
	if(typeof keyword !== 'string') {
		return res.status(400).json({
			error: 'INVALID KEYWORD'
		});
	}

	if(keyword === 'all') {
		Posting.find()
		.sort({_id: -1}).limit(40)
		.exec((err, datas) => {
			if(err) throw err;
			res.json(datas);
		});
	} else {
		Posting.find({$or: [{title: {$regex: keyword, $options: 'i'}}, {name: {$regex: keyword, $options: 'i'}}]})
		.sort({_id: -1}).limit(40)
		.exec((err, datas) => {
			if(err) throw err;
			res.json(datas);
		});
	}
});

router.get('/search/:keyword/:lastId', (req, res) => {
	let keyword = req.params.keyword;
	let lastId = req.params.lastId;
	if(typeof keyword !== 'string') {
		return res.status(400).json({
			error: 'INVALID KEYWORD'
		});
	} else if(!mongoose.Types.ObjectId.isValid(lastId)) {
		return res.status(400).json({
			error: 'INVALID ID'
		});
	}

	let objId = mongoose.Types.ObjectId(lastId);
	if(keyword === 'all') {
		Posting.find({_id: {$lt: objId}})
		.sort({_id: -1}).limit(40)
		.exec((err, datas) => {
			if(err) throw err;
			res.json(datas);
		});
	} else {
		Posting.find({$and: [{_id: {$lt: objId}}, {$or: [{title: {$regex: keyword, $options: 'i'}}, {name: {$regex: keyword, $options: 'i'}}]}]})
		.sort({_id: -1}).limit(40)
		.exec((err, datas) => {
			if(err) throw err;
			res.json(datas);
		});
	}
});

export default router;
