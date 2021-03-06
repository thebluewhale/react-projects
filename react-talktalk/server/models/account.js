import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Account = new Schema({
	username: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		trim: false
	},
	email: {
		type: String,
		trim: true
	},
	chatList: {
		type : [String]
	},
	created: {
		type: Date,
		default: Date.now
	}
});

Account.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, 8);
};

Account.methods.validateHash = function(password) {
	return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('account', Account);
