import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Posting = new Schema({
	company: {
		type: String, trim: true
	},
	name : {
		type: String, trim: true
	},
	category : {
		type: String, trim: true
	},
	title: {
		type: String, trim: true
	},
	link: {
		type: String, trim: true
	},
	jobGroup: {
		type: String, trim: true
	},
	jobFilter: {
		type: String, trim: true
	},
	expire: {
		type: String, trim: true
	}
});

export default mongoose.model('posting', Posting);
