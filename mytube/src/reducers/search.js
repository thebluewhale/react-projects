import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	searchUser: {
		status: 'INIT',
		data: []
	}
};

export default function authentication(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.SEARCH_USER_REQUEST :
			return update(state, {
				searchUser: {
					status: {$set: 'WAITING'}
				}
			});
		case types.SEARCH_USER_SUCCESS :
			return update(state, {
				searchUser: {
					status: {$set: 'SUCCESS'},
					data: {$set: action.data.searchResult}
				}
			});
		case types.SEARCH_USER_FAILURE :
			return update(state, {
				searchUser: {
					status: {$set: 'FAILURE'},
					data: {$set: []}
				}
			});
		default :
			return state;
	}
}
