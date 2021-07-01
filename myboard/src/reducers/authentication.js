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
	},
	saveChange: {
		status: 'INIT',
		error: -1
	}
};

export default function authentication(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.AUTH_LOGIN :
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
					data: {$set: action.data.accountData}
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
		case types.AUTH_REGISTER :
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
		case types.AUTH_GET_STATUS :
			return update(state, {
				status: {
					isLoggedIn: {$set: true}
				}
			});
		case types.AUTH_GET_STATUS_SUCCESS :
			return update(state, {
				status: {
					valid: {$set: true},
					currentUser: {$set: action.username}
				},
				userInfo: {
					data: {$set: action.data.accountData}
				}
			});
		case types.AUTH_GET_STATUS_FAILURE :
			return update(state, {
				status: {
					valid: {$set: false},
					isLoggedIn: {$set: false}
				},
				userInfo: {
					data: {$set: {}}
				}
			});
		case types.AUTH_SAVECHANGE :
			return update(state, {
				saveChange: {
					status: {$set: 'WAITING'},
					error: {$set: -1}
				}
			});
		case types.AUTH_SAVECHANGE_SUCCESS :
			return update(state, {
				saveChange: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.AUTH_SAVECHANGE_FAILURE :
			return update(state, {
				saveChange: {
					status: {$set: 'FAILURE'},
					error: {$set: action.error}
				}
			});
		case types.AUTH_LOGOUT :
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
