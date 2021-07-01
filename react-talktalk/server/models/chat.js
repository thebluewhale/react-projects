import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Chat = new Schema({
	from: {
		type: String,
		trim: true
	},
	to: {
		type: String,
		trim: false
	},
	contents: {
		type: String,
		trim: true
	},
	isRead : {
		type: Boolean
	},
	sended: {
		type: Date,
		default: Date.now
	}
});

export default mongoose.model('chat', Chat);
