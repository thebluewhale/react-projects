import authentication from './authentication';
import memo from './memo';
import message from './message';
import {combineReducers} from 'redux';

export default combineReducers({
	authentication,
	memo,
	message
});
