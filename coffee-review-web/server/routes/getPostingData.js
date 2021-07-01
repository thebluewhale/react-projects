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

router.get('/search/:keyword/:filter', (req, res) => {
	let keyword = req.params.keyword;
	let filter = req.params.filter;
	if(typeof keyword !== 'string' || typeof filter !== 'string') {
		return res.status(400).json({
			error: 'INVALID KEYWORD'
		});
	}

	if(keyword === 'all') {
		/* when keyword is 'all', filter should not be 'nofilter'*/
		Posting.find({jobFilter: filter})
		.sort({_id: -1}).limit(40)
		.exec((err, datas) => {
			if(err) throw err;
			res.json(datas);
		});
	} else {
		if(filter === 'nofilter') {
			Posting.find({$or: [{title: {$regex: keyword, $options: 'i'}}, {name: {$regex: keyword, $options: 'i'}}]})
			.sort({_id: -1}).limit(40)
			.exec((err, datas) => {
				if(err) throw err;
				res.json(datas);
			});
		} else {
			Posting.find({$and: [{jobFilter: filter}, {name: {$regex: keyword, $options: 'i'}}]})
			.sort({_id: -1}).limit(40)
			.exec((err, datas) => {
				if(err) throw err;
				res.json(datas);
			});
		}
	}
});

router.get('/search/:keyword/:filter/:lastId', (req, res) => {
	let keyword = req.params.keyword;
	let filter = req.params.filter;
	let lastId = req.params.lastId;
	if(typeof keyword !== 'string' || typeof filter !== 'string') {
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
		/* when keyword is 'all', filter should not be 'nofilter'*/
		Posting.find({$and: [{_id: {$lt: objId}}, {jobFilter: filter}]})
		.sort({_id: -1}).limit(40)
		.exec((err, datas) => {
			if(err) throw err;
			res.json(datas);
		});
	} else {
		if(filter === 'nofilter') {
			Posting.find({$and: [{_id: {$lt: objId}}, {$or: [{title: {$regex: keyword, $options: 'i'}}, {name: {$regex: keyword, $options: 'i'}}]}]})
			.sort({_id: -1}).limit(40)
			.exec((err, datas) => {
				if(err) throw err;
				res.json(datas);
			});
		} else {
			Posting.find({$and: [{_id: {$lt: objId}}, {name: {$regex: keyword, $options: 'i'}}, {jobFilter: filter}]})
			.sort({_id: -1}).limit(40)
			.exec((err, datas) => {
				if(err) throw err;
				res.json(datas);
			});
		}
	}
});

export default router;
