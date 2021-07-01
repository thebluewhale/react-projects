import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const VOC = new Schema({
	vocContents: {
		type: String,
		trime: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

export default mongoose.model('voc', VOC);
