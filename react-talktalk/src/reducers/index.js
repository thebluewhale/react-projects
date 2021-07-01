import {combineReducers} from 'redux';
import authentication from './authentication';
import chat from './chat';

export default combineReducers({
	authentication,
	chat
});
