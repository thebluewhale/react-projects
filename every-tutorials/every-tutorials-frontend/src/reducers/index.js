import {combineReducers} from 'redux';
import account from './account';
import posting from './posting';

export default combineReducers({
	account: account,
	posting: posting
});
