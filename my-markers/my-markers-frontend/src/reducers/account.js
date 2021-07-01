import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	addNewUser: {
		status: 'INIT'
	},
	login: {
		status: 'INIT'
	},
	session: {
		isLoggedIn: false,
		access_token: '',
		username: ''
	}
};

export default function account(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.ACCOUNT_ADDNEWUSER_REQUEST :
			return update(state, {
				addNewUser: {
					status: {$set: 'WAITING'}
				}
			});
		case types.ACCOUNT_ADDNEWUSER_SUCCESS :
			return update(state, {
				addNewUser: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.ACCOUNT_ADDNEWUSER_FAILURE :
			return update(state, {
				addNewUser: {
					status: {$set: 'FAILURE'}
				}
			})
		case types.ACCOUNT_LOGIN_REQUEST :
			return update(state, {
				login: {
					status: {$set: 'WAITING'}
				},
				session: {
					isLoggedIn: {$set: false},
					access_token: {$set: ''},
					username: {$set: ''}
				}
			});
		case types.ACCOUNT_LOGIN_SUCCESS :
			return update(state, {
				login: {
					status: {$set: 'SUCCESS'}
				},
				session: {
					isLoggedIn: {$set: true},
					access_token: {$set: action.data.access_token},
					username: {$set: action.data.username}
				},
			});
		case types.ACCOUNT_LOGIN_FAILURE :
			return update(state, {
				login: {
					status: {$set: 'FAILURE'}
				},
				session: {
					isLoggedIn: {$set: false},
					access_token: {$set: ''},
					username: {$set: ''}
				}
			});
		case types.ACCOUNT_CHECKTOKEN_REQUEST : 
			return update(state, {});
		case types.ACCOUNT_CHECKTOKEN_SUCCESS :
			return update(state, {
				session: {
					isLoggedIn: {$set: action.res}
				}
			});
		case types.ACCOUNT_CHECKTOKEN_FAILURE :
			return update(state, {
				session: {
					isLoggedIn: {$set: false},
					access_token: {$set: ''}
				}
			});
		default :
			return state;
	}
}
