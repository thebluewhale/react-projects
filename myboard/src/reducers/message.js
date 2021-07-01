import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';
const initialState = {
	send: {
		status: 'INIT',
		error: -1
	},
	list: {
		status: 'INIT',
		error: -1,
		data: []
	},
	remove: {
		status: 'INIT',
		error: -1
	}
};

export default function authentication(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.MESSAGE_SEND :
			return update(state, {
				send: {
					status: {$set: 'WAITING'},
					error: {$set: -1}
				}
			});
		case types.MESSAGE_SEND_SUCCESS :
			return update(state, {
				send: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.MESSAGE_SEND_FAILURE :
			return update(state, {
				send: {
					status: {$set: 'FAILURE'},
					code: {$set: action.error}
				}
			});
		case types.MESSAGE_LIST :
			return update(state, {
				list: {
					status: {$set: 'WAITING'},
					error: {$set: -1}
				}
			});
		case types.MESSAGE_LIST_SUCCESS :
			return update(state, {
				list: {
					status: {$set: 'SUCCESS'},
					data: {$set: action.data}
				}
			});
		case types.MESSAGE_LIST_FAILURE :
			return update(state, {
				list: {
					status: {$set: 'FAILURE'},
					error: {$set: action.error}
				}
			});
		case types.MESSAGE_REMOVE :
			return update(state, {
				remove: {
					status: {$set: 'WAITING'},
					error: {$set: -1}
				}
			});
		case types.MESSAGE_REMOVE_SUCCESS :
			return update(state, {
				remove: {
					status: {$set: 'SUCCESS'}
				},
				list: {
					data: {$splice: [[action.index, 1]]}
				}
			});
		case types.MESSAGE_REMOVE_FAILURE :
			return update(state, {
				remove: {
					status: {$set: 'FAILURE'},
					error: {$set: action.error}
				}
			});
		default :
			return state;
	}
}
