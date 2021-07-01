import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	login: {
		status: 'INIT',
		errorCode: -1
	},
	signup: {
		status: 'INIT',
		errorCode: -1
	},
	signupConfirm: {
		status: 'INIT',
		errorCode: -1
	},
	session: {
		valid: false,
		isLoggedIn: false,
		currentUser: '',
		haveTempData: false,
		email: '',
		created: undefined
	},
	manageBookmarks: {
		status: 'INIT'
	},
	hasBookmarked: {
		status: 'INIT',
		bookmarked: false
	},
	bookmarks: {
		status: 'INIT',
		data: []
	}
};

export default function account(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.ACCOUNT_LOGIN_REQUEST :
			return update(state, {
				login: {
					status: {$set: 'WAITING'},
					errorCode: {$set: -1}
				}
			});
		case types.ACCOUNT_LOGIN_SUCCESS :
			return update(state, {
				login: {
					status: {$set: 'SUCCESS'}
				},
				session: {
					valid: {$set: true},
					isLoggedIn: {$set: true},
					currentUser: {$set: action.username}
				}
			});
		case types.ACCOUNT_LOGIN_FAILURE :
			return update(state, {
				login: {
					status: {$set: 'FAILURE'},
					errorCode: {$set: action.errorCode}
				},
				session: {
					valid: {$set: false},
					isLoggedIn: {$set: false},
					currentUser: {$set: ''}
				}
			});
		case types.ACCOUNT_SIGNUP_REQUEST :
			return update(state, {
				signup: {
					status: {$set: 'WAITING'}
				}
			});
		case types.ACCOUNT_SIGNUP_SUCCESS :
			return update(state, {
				signup: {
					status: {$set: 'SUCCESS'},
					errorCode: {$set: -1}
				}
			});
		case types.ACCOUNT_SIGNUP_FAILURE :
			return update(state, {
				signup: {
					status: {$set: 'FAILURE'},
					errorCode: {$set: action.errorCode}
				}
			});
		case types.ACCOUNT_SIGNUP_CONFIRM_REQUEST :
			return update(state, {
				signupConfirm: {
					status: {$set: 'WAITING'},
					errorCode: {$set: -1}
				}
			});
		case types.ACCOUNT_SIGNUP_CONFIRM_SUCCESS :
			return update(state, {
				signupConfirm: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.ACCOUNT_SIGNUP_CONFIRM_FAILURE :
			return update(state, {
				signupConfirm: {
					status: {$set: 'FAILURE'}
				}
			});
		case types.ACCOUNT_LOGOUT_REQUEST :
			return update(state, {
				session: {
					valid: {$set: false},
					isLoggedIn: {$set: false},
					currentUser: {$set: ''}
				}
			});
		case types.ACCOUNT_GET_INFO_REQUEST :
			return update(state, {
				session: {
					valid: {$set: false},
					isLoggedIn: {$set: false},
					currentUser: {$set: ''},
					haveTempData: {$set: false},
					email: {$set: ''},
					created: {$set: undefined}
				}
			});
		case types.ACCOUNT_GET_INFO_SUCCESS :
			return update(state, {
				session: {
					valid: {$set: true},
					isLoggedIn: {$set: true},
					currentUser: {$set: action.data.accountData.username},
					haveTempData: {$set: action.data.postingData.haveTempData},
					email: {$set: action.data.accountData.email},
					created: {$set: action.data.accountData.created}
				}
			});
		case types.ACCOUNT_GET_INFO_FAILURE :
			return update(state, {
				session: {
					valid: {$set: false},
					isLoggedIn: {$set: false},
					currentUser: {$set: ''},
					haveTempData: {$set: false},
					email: {$set: ''},
					created: {$set: undefined}
				}
			});
		case types.ACCOUNT_MANAGE_BOOKMARKS_REQUEST :
			return update(state, {
				manageBookmarks: {
					status: {$set: 'WAITING'}
				}
			});
		case types.ACCOUNT_MANAGE_BOOKMARKS_SUCCESS :
			return update(state, {
				manageBookmarks: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.ACCOUNT_MANAGE_BOOKMARKS_FAILURE :
			return update(state, {
				manageBookmarks: {
					status: {$set: 'FAILURE'}
				}
			});
		case types.ACCOUNT_HASBOOKMARKED_REQUEST :
			return update(state, {
				hasBookmarked: {
					status: {$set: 'WAITING'},
					bookmarked: {$set: false}
				}
			});
		case types.ACCOUNT_HASBOOKMARKED_SUCCESS :
			return update(state, {
				hasBookmarked: {
					status: {$set: 'SUCCESS'},
					bookmarked: {$set: action.data}
				}
			});
		case types.ACCOUNT_HASBOOKMARKED_FAILURE :
			return update(state, {
				hasBookmarked: {
					status: {$set: 'FAILURE'},
					bookmarked: {$set: false}
				}
			});
		case types.ACCOUNT_GET_BOOKMARKS_REQUEST :
			return update(state, {
				bookmarks: {
					status: {$set: 'WAITING'},
					data: {$set: []}
				}
			});
		case types.ACCOUNT_GET_BOOKMARKS_SUCCESS :
			return update(state, {
				bookmarks: {
					status: {$set: 'SUCCESS'},
					data: {$set: action.data}
				}
			});
		case types.ACCOUNT_GET_BOOKMARKS_FAILURE :
			return update(state, {
				bookmarks: {
					status: {$set: 'FAILURE'},
					data: {$set: []}
				}
			});
		default :
			return state;
	}
}
