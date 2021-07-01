import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	addNewUser: {
		status: 'INIT',
		errorCode: -1
	},
	login: {
		status: 'INIT',
		errorCode: -1
	},
	session: {
		isLoggedIn: false,
		access_token: '',
		username: ''
	},
	getInfo: {
		status: 'INIT',
		accountInfo: {}
	},
	delete: {
		status: 'INIT',
		errorCode: -1
	},
	sendTempPassword: {
		status: 'INIT'
	},
	updateUser: {
		status: 'INIT',
		errorCode: -1
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
					status: {$set: 'WAITING'},
					errorCode: {$set: -1}
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
					status: {$set: 'FAILURE'},
					errorCode: {$set: action.data.errorCode}
				}
			})
		case types.ACCOUNT_LOGIN_REQUEST :
			return update(state, {
				login: {
					status: {$set: 'WAITING'},
					errorCode: {$set: -1}
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
					status: {$set: 'FAILURE'},
					errorCode: {$set: action.data.errorCode}
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
		case types.ACCOUNT_LOGOUT_SUCCESS :
			return update(state, {
				session: {
					isLoggedIn: {$set: false},
					access_token: {$set: ''},
					username: {$set: ''}
				}
			});
		case types.ACCOUNT_GETINFO_REQUEST :
			return update(state, {
				getInfo: {
					status: {$set: 'WAITING'},
					accountInfo: {$set: {}}
				}
			});
		case types.ACCOUNT_GETINFO_SUCCESS :
			return update(state, {
				getInfo: {
					status: {$set: 'SUCCESS'},
					accountInfo: {$set: action.accountInfo}
				}
			});
		case types.ACCOUNT_GETINFO_FAILURE :
			return update(state, {
				getInfo: {
					status: {$set: 'FAILURE'},
					accountInfo: {$set: {}}
				}
			});
		case types.ACCOUNT_DELETEUSER_REQUEST :
			return update(state, {
				delete: {
					status: {$set: 'WAITING'},
					errorCode: {$set: -1}
				}
			});
		case types.ACCOUNT_DELETEUSER_SUCCESS :
			return update(state, {
				delete: {
					status: {$set: 'SUCCESS'}
				},
				session: {
					isLoggedIn: {$set: false},
					access_token: {$set: ''},
					username: {$set: ''}
				}
			});
		case types.ACCOUNT_DELETEUSER_FAILURE :
			return update(state, {
				delete: {
					status: {$set: 'FAILURE'},
					errorCode: {$set: action.data.errorCode}
				}
			});
		case types.ACCOUNT_SENDTEMPPASSWORD_REQUEST :
			return update(state, {
				sendTempPassword: {
					status: {$set: 'WAITING'}
				}
			});
		case types.ACCOUNT_SENDTEMPPASSWORD_SUCCESS :
			return update(state, {
				sendTempPassword: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.ACCOUNT_SENDTEMPPASSWORD_FAILURE :
			return update(state, {
				sendTempPassword: {
					status: {$set: 'FAILURE'}
				}
			});
		case types.ACCOUNT_UPDATEUSER_REQUEST :
			return update(state, {
				updateUser: {
					status: {$set: 'WAITING'}
				}
			});
		case types.ACCOUNT_UPDATEUSER_SUCCESS :
			return update(state, {
				updateUser: {
					status: {$set: 'SUCCESS'}
				},
				getInfo: {
					accountInfo: {$set: action.accountInfo}
				}
			});
		case types.ACCOUNT_UPDATEUSER_FAILURE :
			return update(state, {
				updateUser: {
					status: {$set: 'FAILURE'},
					errorCode: {$set: action.data.errorCode}
				}
			});
		default :
			return state;
	}
}
