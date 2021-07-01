import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Channel = new Schema({
	provider: {
		type: String,
		trim: true
	},
	main: {
		type: String,
		trim: true
	},
	number: {
		type: String,
		trim: true
	},
	category: {
		type: String,
		trim: true
	},
	onair: {
		type: String,
		trim: true
	},
	ratings: {
		type: String,
		trime: true
	}
});

export default mongoose.model('channel', Channel);
