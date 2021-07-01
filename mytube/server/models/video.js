import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Video = new Schema({
	owner: {
		type: String,
		trim: true
	},
	filePath: {
		type: String,
		trim: true
	},
	fileName: {
		type: String,
		trim: true
	},
	created: {
		type: Date
	}
});

export default mongoose.model('video', Video);
