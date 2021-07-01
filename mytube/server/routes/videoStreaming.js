import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/:fileName', (req, res) =>{
	res.contentType('video/mp4');
	let videoDir = __dirname + '/./../../resources/videos/';
	let videoFile = req.params.fileName;
	let fullPath = videoDir + videoFile;
	let stream = fs.createReadStream(fullPath);
	stream.pipe(res);
});

export default router;
