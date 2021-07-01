import {combineReducers} from 'redux';
import fileManagement from './fileManagement';
import authentication from './authentication';
import search from './search';

export default combineReducers({
	fileManagement,
	authentication,
	search
});
