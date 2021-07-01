import express from 'express';
import mongoose from 'mongoose';
import Channel from '../models/channel';

const router = express.Router();

/* initially get timetable data with nofilter */
router.get('/', (req, res) => {
	Channel.find({}).sort({_id: -1}).limit(20)
	.exec((err, data) => {
		if (err) throw err;
		res.json(data);
	});
});

router.get('/:lastObjId', (req, res) => {
	let lastObjId = req.params.lastObjId;
	if (!mongoose.Types.ObjectId.isValid(lastObjId)) {
		return res.status(400).json({
			error: 'INVALID OBJECT ID'
		});
	}

	lastObjId = mongoose.Types.ObjectId(lastObjId);
	Channel.find({_id: {$lt: lastObjId}})
	.sort({_id: -1}).limit(20)
	.exec((err, data) => {
		if (err) throw err;
		res.json(data);
	});
});

router.get('/filter/:query', (req, res) => {
	let query = `?${req.params.query}`;
	let channel = refineFilter('channel', parseUrl(query, 'channel'));
	let category = refineFilter('category', parseUrl(query, 'category'));

	let DB = undefined;

	if (channel == 'total' && category == 'total') {
		DB = Channel.find({});
	} else if (channel == 'total' && category != 'total') {
		DB = Channel.find({category: category});
	} else if (channel != 'total' && category == 'total') {
		DB = Channel.find({main: channel});
	} else {
		DB = Channel.find({$and: [{main: channel}, {category: category}]});
	}

	DB.sort({_id: -1}).limit(20)
	.exec((err, data) => {
		if (err) throw err;
		res.json(data);
	});
});

router.get('/filter/:query/:lastObjId', (req, res) => {
	let lastObjId = req.params.lastObjId;
	if (!mongoose.Types.ObjectId.isValid(lastObjId)) {
		return res.status(400).json({
			error: 'INVALID OBJECT ID'
		});
	}
	lastObjId = mongoose.Types.ObjectId(lastObjId);

	let query = req.params.query;
	let channel = refineFilter('channel', parseUrl(query, 'channel'));
	let category = refineFilter('category', parseUrl(query, 'category'));

	let DB = undefined;
	if (channel == 'total' && category == 'total') {
		DB = Channel.find({_id: {$lt: lastObjId}});
	} else if (channel == 'total' && category != 'total') {
		DB = Channel.find({$and: [{category: category}, {_id: {$lt: lastObjId}}]});
	} else if (channel != 'total' && category == 'total') {
		DB = Channel.find({$and: [{main: channel}, {_id: {$lt: lastObjId}}]});
	} else {
		DB = Channel.find({$and: [{main: channel}, {category: category}, {_id: {$lt: lastObjId}}]});
	}

	DB.sort({_id: -1}).limit(20)
	.exec((err, data) => {
		if (err) throw err;
		res.json(data);
	});
});

router.get('/search/:keyword', (req, res) => {
	let keyword = req.params.keyword;

	Channel.find({$or: [{provider: {$regex: keyword, $options: 'i'}}, {onair: {$regex: keyword, $options:'i'}}]})
	.sort({_id: -1})
	.exec((err, data) => {
		if (err) throw err;
		res.json(data);
	});
});

var parseUrl = function(query, name) {
	name = name.replace(/[\[\]]/g, "\\$&");
	let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
	let results = regex.exec(query);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var refineFilter = function(filter, name) {
	if (filter == 'channel') {
		if (name == '공중파') {
			return 'public';
		}  else if (name == '종합편성') {
			return 'organization';
		} else if (name == '케이블') {
			return 'cable';
		} else if (name == '스카이라이프') {
			return 'skylife';
		} else {
			return 'total';
		}
	} else if (filter == 'category') {
		if (name == '전체') {
			return 'total';
		} else {
			return name;
		}
	}
}

export default router;
