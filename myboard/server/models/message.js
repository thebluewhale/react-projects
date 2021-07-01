import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Message = new Schema({
	from: String,
	to: String,
	contents: String,
	date: {
		type: Date, default: Date.now
	}
});

export default mongoose.model('message', Message);
