import {combineReducers} from 'redux';
import account from './account';
import marker from './marker';

export default combineReducers({
	account: account,
	marker: marker
});
