import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	send: {
		status: 'INIT',
		error: -1
	},
	chat: {
		status: 'INIT',
		data: []
	},
	chatList: {
		status: 'INIT',
		data: []
	},
	status: {
		currentPartner: ''
	}
};

export default function chat(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.CHAT_SEND_MESSAGE :
			return update(state, {
				send: {
					status: {$set: 'WAITING'},
					error: {$set: -1}
				}
			});
		case types.CHAT_SEND_MESSAGE_SUCCESS :
			return update(state, {
				send: {
					status: {$set: 'SUCCESS'},
					error: {$set: -1}
				}
			});
		case types.CHAT_SEND_MESSAGE_FAILURE :
			return update(state, {
				send: {
					status: {$set: 'FAILURE'},
					error: {$set: action.error}
				}
			});
		case types.CHAT_GET_MESSAGE :
			return update(state, {
				chat: {
					status: {$set: 'WAITING'}
				},
				status: {
					currentPartner: {$set: action.partner}
				}
			});
		case types.CHAT_GET_MESSAGE_SUCCESS :
			if(action.isInitial) {
				return update(state, {
					chat: {
						status: {$set: 'SUCCESS'},
						data: {$set: action.data}
					}
				});
			} else {
				return update(state, {
					chat: {
						status: {$set: 'SUCCESS'},
						data: {$push: action.data}
					}
				});
			}
			return state;
		case types.CHAT_GET_MESSAGE_FAILURE :
			return update(state, {
				chat: {
					status: {$set: 'FAILURE'}
				}
			});
		case types.CHAT_GET_CHATLIST :
			return update(state, {
				chatList: {
					status: {$set: 'WAITING'}
				}
			});
		case types.CHAT_GET_CHATLIST_SUCCESS :
			return update(state, {
				chatList: {
					status: {$set: 'SUCCESS'},
					data: {$set: action.data}
				}
			});
		case types.CHAT_GET_CHATLIST_FAILURE :
			return update(state, {
				chatList: {
					status: {$set: 'FAILURE'},
					data: {$set: []}
				}
			});
		default :
			return state;
	}
}
