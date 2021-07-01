import { create } from 'domain';

const express = require('express');
const Posting = require('../db/models/posting');
const childProcess = require('child_process');
const fs = require('fs');
const uploadUtil = require('../utils/uploadUtil');

const router = express.Router();

router.post('/post/new', (req, res) => {
	let author = req.body.author;
	let category = req.body.category;
	let title = req.body.title;
	let contents = req.body.contents;

	let newPosting = new Posting({
		author: author,
		category: category,
		title: title,
		contents: contents,
		created: new Date(),
		saveStatus: 'DONE'
	});

	newPosting.save((error) => {
		if (error) {
			throw err;
		} else {
			return res.status(200).json({
				success: true
			});
		}
	});
});

router.post('/upload/image', uploadUtil.single('upload'), (req, res) => {
	let filePath = req.file.path;
	let splits = filePath.split('/');
	let fileName = splits[splits.length - 1];

	let html = '';
    html += '<script type="text/javascript">';
    html += 'var funcNum = ' + req.query.CKEditorFuncNum + ';';
    html += 'var url = \'/posting/images/' + fileName + '\';';
    html += 'var message = \'업로드 완료\';';
    html += 'window.parent.CKEDITOR.tools.callFunction(funcNum, url);';
    html += '</script>';
    res.send(html);
});

router.get('/images/:filename', (req, res) => {
	let folderPath = __dirname + '/../../resources/';
	let fileName = req.params.filename;
	let fullPath = folderPath + fileName;
	setTimeout(() => {
		fs.exists(fullPath, (exists) => {
			if (exists) {
				res.send(fs.readFileSync(fullPath));
			}
		});
	}, 500);
});

router.get('/load/all', (req, res) => {
	Posting.find({saveStatus: 'DONE'}).sort({'_id': -1})
	.limit(40).exec((error, data) => {
		if (error) {
			throw error;
		} else {
			res.json(data);
		}
	});
});

router.get('/load/bycategory/:category', (req, res) => {
	let category = req.params.category;
	let decodedCategory = decodeURIComponent(category);
	Posting.find({$and: [{saveStatus: 'DONE'}, {category: decodedCategory}]})
	.sort({'_id': -1})
	.limit(40).exec((error, data) => {
		if (error) {
			throw error;
		} else {
			res.json(data);
		}
	});
});

router.get('/load/temp/list/:author', (req, res) => {
	let author = req.params.author;
	Posting.find({$and: [{author: author}, {saveStatus: 'TEMP'}]})
	.exec((error, data) => {
		if (error) {
			return error;
		} else {
			res.json(data);
		}
	});
});

router.get('/load/temp/item/:postingId', (req, res) => {
	let postingId = req.params.postingId;
	Posting.findById(postingId, (error, data) => {
		if (error) {
			throw error;
		} else {
			res.json(data);
		}
	});
});

router.get('/read/:postingId', (req, res) => {
	let postingId = req.params.postingId;
	Posting.findById(postingId, (error, data) => {
		if (error) {
			throw error;
		} else {
			res.json(data);
		}
	});
});

router.post('/save/temp', (req, res) => {
	let author = req.body.author;
	let category = req.body.category;
	let title = req.body.title;
	let contents = req.body.contents;
	let tempItemId = req.body.tempItemId;

	if (tempItemId === 'new') {
		let tempPosting = new Posting({
			author: author,
			category: category,
			title: title,
			contents: contents,
			created: new Date(),
			saveStatus: 'TEMP'
		});

		tempPosting.save((error) => {
			if (error) {
				throw err;
			} else {
				return res.status(200).json({
					success: true
				});
			}
		});
	} else {
		Posting.findById(tempItemId, (error, data) => {
			if (error) {
				throw error;
			} else {
				data.category = category;
				data.title = title;
				data.contents = contents;
				created: new Date();
				data.save((error) => {
					if (error) {
						throw error;
					} else {
						return res.status(200).json({
							success: true
						});
					}
				});
			}
		});
	}
});

router.delete('/remove/:id', (req, res) => {
	if (typeof req.session.loginInfo === 'undefined') {
		return res.status(401).json({
			success: false,
			errorCode: 1
		});
	}

	let username = req.session.loginInfo.username;
	let postingId = req.params.id;

	Posting.findById(postingId, (error, data) => {
		if (error) {
			throw error;
		} else {
			if (!data) {
				return res.status(400).json({
					success: false,
					errorCode: 2
				});
			} else if (data.author != username) {
				return res.status(401).json({
					success: false,
					errorCode: 1
				});
			} else {
				Posting.remove({_id: postingId}, (error) => {
					if (error) {
						throw error;
					} else {
						return res.status(200).json({
							success: true
						});
					}
				});
			}
		}
	});
});

router.put('/post/modify/:id', (req, res) => {
	let postingId = req.params.id;
	let category = req.body.category;
	let title = req.body.title;
	let contents = req.body.contents;

	Posting.findById(postingId, (error, data) => {
		if (error) {
			throw error;
		} else if (!data) {
			res.status(400).json({
				success: false
			});
		} else {
			data.category = category;
			data.title = title;
			data.contents = contents;
			data.save((error) => {
				if (error) {
					throw error;
				} else {
					res.status(200).json({
						success: true
					});
				}
			});
		}
	});
});


module.exports = router;
