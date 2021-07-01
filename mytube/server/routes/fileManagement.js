import express from 'express';
import Video from '../models/video';
import childProcess from 'child_process';
import mongoose from 'mongoose';
import fs from 'fs';
import upload from '../utils/uploadUtil';

const router = express.Router();

router.get('/getList', (req, res) => {
	Video.find()
	.sort({_id: -1})
	.limit(6)
	.exec((err, files) => {
		if(err) throw err;
		return res.json({
			success: true,
			files
		});
	});
});

router.get('/getList/:wall', (req, res) => {
	let owner = req.params.wall;
	Video.find({owner: owner})
	.sort({id: -1})
	.limit(6)
	.exec((err, files) => {
		if(err) throw err;
		return res.json({
			success: true,
			files
		});
	});
});

router.get('/getList/:requestType/:id', (req, res) => {
	let requestType = req.params.requestType;
	let id = req.params.id;
	let path = './videos';

	if(requestType !== 'old') {
		return res.status(400).json({
			error: 'INVALID REQUEST TYPE',
			code: 1
		});
	} else if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			error: 'INVALID OBJECT ID',
			code: 2
		});
	}

	let objId = mongoose.Types.ObjectId(id);
	Video.find({_id: {$lt: objId}})
	.sort({_id: -1})
	.limit(6)
	.exec((err, files) => {
		if(err) throw err;
		return res.json({
			success: true,
			files
		});
	});
});

router.post('/upload/:username/:uploadFileName', (req, res) => {
	let newFileName = req.params.username + '_' + req.params.uploadFileName;
	Video.findOne({fileName: newFileName}, (err, data) => {
		if(err) {
			throw err;
		} else if(data) {
			return res.status(400).json({
				error: "THIS FILE ALREADY EXISTS",
				code: 1
			});
		} else {
			upload(req, res, (err) => {
				if(err) {
					if(err.code === 'LIMIT_FILE_SIZE') {
						return res.status(400).json({
							error: 'TOO LARGE FILE',
							code: 2
						});
					} else {
						throw err;
					}
				} else if(req.fileValidationError) {
					return res.status(400).json({
						error: 'INVALID FILE TYPE',
						code: 3
					});
				}

				// Extract thumbnail by using ffmpeg.
				let resDir = __dirname + '/../../resources/';
				let videoFullPath = resDir + 'videos/' + newFileName;
				let thumbnailFullPath = resDir + 'thumbnails/' + newFileName + '.png';
				let execCommand = 'ffmpeg -i ' + videoFullPath +
								  ' -f image2 -t 0.001 -ss 1.0 ' + thumbnailFullPath;
				childProcess.exec(execCommand);

				// Save Video information DB.
				let newVideo = new Video({
					owner: req.body.username,
					filePath: req.file.path,
					fileName: newFileName,
					created: Date.now()
				});
				newVideo.save((err, data) => {
					if(err) throw err;
					return res.json({success: true});
				});
			});
		}
	});
});

router.delete('/delete/:deleteItemId', (req, res) => {
	let deleteItemId = req.params.deleteItemId;
	if(!mongoose.Types.ObjectId.isValid(deleteItemId)) {
		return res.status(403).json({
			error: 'INVALID ITEM ID',
			code: 1
		});
	} else if(typeof req.session.loginInfo === 'undefined') {
		return res.status(403).json({
			error: 'NOT LOGGED IN',
			code: 2
		});
	} else {
		Video.findById(deleteItemId, (err, data) => {
			if(err) {
				throw err;
			} else if(!data) {
				return res.status(403).json({
					error: 'NO VIDEO DATA DB',
					code: 3
				});
			} else if(data.owner !== req.session.loginInfo.username) {
				return res.status(403).json({
					error: 'PERMISSION DEMIED',
					code: 4
				});
			} else {
				let filePath = data.filePath;
				let thumbnailPath = __dirname + '/../../resources/thumbnails/' + data.fileName + '.png';
				fs.exists(filePath, (exists) => {
					if(exists) {
						fs.unlink(filePath, (err) => {
							if(err) throw err;
						});
					}
				});
				fs.exists(thumbnailPath, (exists) => {
					if(exists) {
						fs.unlink(thumbnailPath, (err) => {
							if(err) throw err;
						});
					}
				});
				Video.remove({_id: deleteItemId}, (err) => {
					if(err) {
						throw err;
					} else {
						return res.json({success: true});
					}
				});
			}
		});
	}
});

router.get('/thumbnail/:fileName', (req, res) =>{
	let thumbnailDir = __dirname + '/./../../resources/thumbnails/';
	let thumbnailFile = req.params.fileName + '.png';
	let fullPath = thumbnailDir + thumbnailFile;
	res.contentType('image/png');
	fs.exists(fullPath, (exists) => {
		if(exists) {
			res.send(fs.readFileSync(fullPath));
		} else {
			setTimeout(() => {
				fs.exists(fullPath, (exists) => {
					if(exists) {
						res.send(fs.readFileSync(fullPath));
					} else {
						let defaultDir = __dirname + '/./../../resources/default/';
						let defaultFile = 'defaultThumbnail.png';
						res.send(fs.readFileSync(defaultDir + defaultFile));
					}
				});
			}, 500);
		}
	});
});

export default router;
