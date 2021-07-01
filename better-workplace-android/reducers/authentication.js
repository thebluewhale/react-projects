import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	login: {
		status: 'INIT'
	},
	register: {
		status: 'INIT',
		error: -1
	},
	status: {
		valid: false,
		isLoggedIn: false,
		currentUser: ''
	},
	userInfo: {
		data: {}
	}
};

export default function authentication(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.AUTH_LOGIN_REQUEST :
			return update(state, {
				login: {
					status: {$set: 'WAITING'}
				}
			});
		case types.AUTH_LOGIN_SUCCESS :
			return update(state, {
				login: {
					status: {$set: 'SUCCESS'}
				},
				status: {
					isLoggedIn: {$set: true},
					currentUser: {$set: action.username}
				},
				userInfo: {
					data: {$set: action.data.data}
				}
			});
		case types.AUTH_LOGIN_FAILURE :
			return update(state, {
				login: {
					status: {$set: 'FAILURE'}
				},
				userInfo: {
					data: {$set: {}}
				}
			});
		case types.AUTH_REGISTER_REQUEST :
			return update(state, {
				register: {
					status: {$set: 'WAITING'},
					error: {$set: -1}
				}
			});
		case types.AUTH_REGISTER_SUCCESS :
			return update(state, {
				register: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.AUTH_REGISTER_FAILURE :
			return update(state, {
				register: {
					status: {$set: 'FAILURE'},
					error: {$set: action.error}
				}
			});
		case types.AUTH_GETSTATUS_REQUEST :
			return update(state, {
				status: {
					isLoggedIn: {$set: true}
				}
			});
		case types.AUTH_GETSTATUS_SUCCESS :
			return update(state, {
				status: {
					valid: {$set: true},
					currentUser: {$set: action.username}
				},
				userInfo: {
					data: {$set: action.data.data}
				}
			});
		case types.AUTH_GETSTATUS_FAILURE :
			return update(state, {
				status: {
					valid: {$set: false},
					isLoggedIn: {$set: false}
				},
				userInfo: {
					data: {$set: {}}
				}
			});
		case types.AUTH_LOGOUT_REQUEST :
			return update(state, {
				status: {
					isLoggedIn: {$set: false},
					currentUser: {$set: ''}
				},
				userInfo: {
					data: {$set: {}}
				}
			});
		default :
			return state;
	}
}
