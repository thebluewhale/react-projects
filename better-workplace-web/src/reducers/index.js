import {combineReducers} from 'redux';
import authentication from './authentication';
import getPostingData from './getPostingData';

export default combineReducers({
	authentication,
	getPostingData
});
