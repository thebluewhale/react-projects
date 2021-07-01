import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	login: {
		status: 'INIT',
		errorCode: -1
	},
	register: {
		status: 'INIT',
		errorCode: -1
	},
	sessionStatus: {
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
					status: {$set: 'WAITING'},
					errorCode: {$set: -1}
				}
			});
		case types.AUTH_LOGIN_SUCCESS :
			return update(state, {
				login: {
					status: {$set: 'SUCCESS'},
					errorCode: {$set: -1}
				},
				sessionStatus: {
					valid: {$set: true},
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
					status: {$set: 'FAILURE'},
					errorCode: {$set: action.code}
				},
				sessionStatus: {
					valid: {$set: false},
					isLoggedIn: {$set: false},
					currentUser: {$set: ''}
				},
				userInfo: {
					data: {$set: {}}
				}
			});
		case types.AUTH_REGISTER_REQUEST :
			return update(state, {
				register: {
					status: {$set: 'WAITING'},
					errorCode: {$set: -1}
				}
			});
		case types.AUTH_REGISTER_SUCCESS :
			return update(state, {
				register: {
					status: {$set: 'SUCCESS'},
					errorCode: {$set: -1}
				}
			});
		case types.AUTH_REGISTER_FAILURE :
			return update(state, {
				register: {
					status: {$set: 'FAILURE'},
					errorCode: {$set: action.code}
				}
			});
		case types.AUTH_GET_STATUS_REQUEST :
			return update(state, {
				sessionStatus: {
					isLoggedIn: {$set: true}
				}
			});
		case types.AUTH_GET_STATUS_SUCCESS :
			return update(state, {
				sessionStatus: {
					valid: {$set: true},
					isLoggedIn: {$set: true},
					currentUser: {$set: action.username}
				},
				userInfo: {
					data: {$set: action.data.accoutData}
				}
			});
		case types.AUTH_GET_STATUS_FAILURE :
			return update(state, {
				sessionStatus: {
					valid: {$set: false},
					isLoggedIn: {$set: false},
					currentUser: {$set: ''}
				},
				userInfo: {
					data: {$set: {}}
				}
			});
		case types.AUTH_LOGOUT :
			return update(state, {
				sessionStatus: {
					valid: {$set: false},
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
