import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	login: {
		status: 'INIT',
		error: -1
	},
	userInfo: {
		data: {}
	},
	status: {
		currentUser: '',
		isLoggedIn: false,
		valid: false
	},
	register: {
		status: 'INIT',
		error: -1
	},
	searchUser: {
		status: 'INIT',
		results: [],
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
					status: {$set: 'WAITING'},
					error: {$set: -1}
				},
				status: {
					currentUser: {$set: ''},
					isLoggedIn: {$set: false}
				}
			});
		case types.AUTH_LOGIN_SUCCESS :
			return update(state, {
				login: {
					status: {$set: 'SUCCESS'},
					error: {$set: -1}
				},
				userInfo: {
					data: {$set: action.data.accountData}
				},
				status: {
					currentUser: {$set: action.username},
					isLoggedIn: {$set: true},
					valid: {$set: true}
				}
			});
		case types.AUTH_LOGIN_FAILURE :
			return update(state, {
				login: {
					status: {$set: 'FAILURE'},
					error: {$set: action.error}
				},
				userInfo: {
					data: {$set: {}}
				},
				status: {
					currentUser: {$set: ''},
					isLoggedIn: {$set: false},
					valid: {$set: false}
				}
			});
		case types.AUTH_LOGOUT :
			return update(state, {
				userInfo: {
					data: {$set: {}}
				},
				status: {
					currentUser: {$set: ''},
					isLoggedIn: {$set: false}
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
					status: {$set: 'SUCCESS'},
					error: {$set: -1}
				}
			});
		case types.AUTH_REGISTER_FAILURE :
			return update(state, {
				register: {
					status: {$set: 'FAILURE'},
					error: {$set: action.error}
				}
			});
		case types.AUTH_SEARCH :
			return update(state, {
				searchUser: {
					status: {$set: 'WAITING'},
					error: {$set: -1}
				}
			});
		case types.AUTH_SEARCH_SUCCESS :
			return update(state, {
				searchUser: {
					status: {$set: 'SUCCESS'},
					results: {$set: action.data}
				}
			});
		case types.AUTH_SEARCH_FAILURE :
			return update(state, {
				searchUser: {
					status: {$set: 'FAILURE'},
					results: {$set: []},
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
					isLoggedIn: {$set: true},
					currentUser: {$set: action.username}
				},
				userInfo: {
					data: {$set: action.data.accoutData}
				}
			});
		case types.AUTH_GET_STATUS_FAILURE :
			return update(state, {
				status: {
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
