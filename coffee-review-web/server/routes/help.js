import express from 'express';
import VOC from '../models/voc';

const router = express.Router();

router.post('/vocposting', (req, res) => {
	let vocContents = req.body.vocContents;
	if(typeof vocContents !== 'string' || vocContents === '') {
		return res.status(400).json({
			error: 'INVALID CONTENTS'
		});
	} else {
		let newVOC = new VOC({
			vocContents: vocContents
		});
		newVOC.save((error) => {
			if(error) throw error;
			return res.json({success: true});
		});
	}
});

router.get('/hearvoc', (req, res) => {
	VOC.find({})
	.sort({_id: -1})
	.exec((err, datas) => {
		if(err) throw err;
		res.json(datas);
	});
});

export default router;
