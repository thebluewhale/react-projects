import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	postNew: {
		status: 'INIT'
	},
	saveTemp: {
		status: 'INIT'
	},
	postingList: {
		status: 'INIT',
		data: []
	},
	postingItem: {
		status: 'INIT',
		data: {}
	},
	tempPostingList: {
		status: 'INIT',
		data: []
	},
	tempPostingItem: {
		status: 'INIT',
		data: {}
	},
	removeItem: {
		status: 'INIT',
		errorCode: -1
	},
	modifyItem: {
		status: 'INIT'
	}
};

export default function account(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.POSTING_POST_NEW_REQUEST :
			return update(state, {
				postNew: {
					status: {$set: 'WAITING'}
				}
			});
		case types.POSTING_POST_NEW_SUCCESS :
			return update(state, {
				postNew: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.POSTING_POST_NEW_FAILURE :
			return update(state, {
				postNew: {
					status: {$set: 'FAILURE'}
				}
			});
		case types.POSTING_SAVE_TEMP_REQUEST :
			return update(state, {
				saveTemp: {
					status: {$set: 'WAITING'}
				}
			});
		case types.POSTING_SAVE_TEMP_SUCCESS :
			return update(state, {
				saveTemp: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.POSTING_SAVE_TEMP_FAILURE :
			return update(state, {
				saveTemp: {
					status: {$set: 'FAILURE'}
				}
			});
		case types.POSTING_LOAD_ALL_REQUEST :
			return update(state, {
				postingList: {
					status: {$set: 'WAITING'},
					data: {$set: []}
				}
			});
		case types.POSTING_LOAD_ALL_SUCCESS :
			return update(state, {
				postingList: {
					status: {$set: 'SUCCESS'},
					data: {$set: action.data}
				}
			});
		case types.POSTING_LOAD_ALL_FAILURE :
			return update(state, {
				postingList: {
					status: {$set: 'FAILURE'},
					data: {$set: []}
				}
			});
		case types.POSTING_LOAD_BY_CATEGORY_REQUEST :
			return update(state, {
				postingList: {
					status: {$set: 'WAITING'},
					data: {$set: []}
				}
			});
		case types.POSTING_LOAD_BY_CATEGORY_SUCCESS :
			return update(state, {
				postingList: {
					status: {$set: 'SUCCESS'},
					data: {$set: action.data}
				}
			});
		case types.POSTING_LOAD_BY_CATEGORY_FAILURE :
			return update(state, {
				postingList: {
					status: {$set: 'FAILURE'},
					data: {$set: []}
				}
			});
		case types.POSTING_READ_ITEM_REQUEST :
			return update(state, {
				postingItem: {
					status: {$set: 'WAITING'},
					data: {$set: {}}
				}
			});
		case types.POSTING_READ_ITEM_SUCCESS :
			return update(state, {
				postingItem: {
					status: {$set: 'SUCCESS'},
					data: {$set: action.data}
				}
			});
		case types.POSTING_READ_ITEM_FAILURE :
			return update(state, {
				postingItem: {
					status: {$set: 'FAILURE'},
					data: {$set: {}}
				}
			});
		case types.POSTING_LOAD_TEMP_LIST_REQUEST :
			return update(state, {
				tempPostingList: {
					status: {$set: 'WAITING'},
					data: {$set: []}
				}
			});
		case types.POSTING_LOAD_TEMP_LIST_SUCCESS :
			return update(state, {
				tempPostingList: {
					status: {$set: 'SUCCESS'},
					data: {$set: action.data}
				}
			});
		case types.POSTING_LOAD_TEMP_LIST_FAILURE :
			return update(state, {
				tempPostingList: {
					status: {$set: 'FAILURE'},
					data: {$set: []}
				}
			});
		case types.POSTING_LOAD_TEMP_ITEM_REQUEST :
			return update(state, {
				tempPostingItem: {
					status: {$set: 'WAITING'},
					data: {$set: {}}
				}
			});
		case types.POSTING_LOAD_TEMP_ITEM_SUCCESS :
			return update(state, {
				tempPostingItem: {
					status: {$set: 'SUCCESS'},
					data: {$set: action.data}
				}
			});
		case types.POSTING_LOAD_TEMP_ITEM_FAILURE :
			return update(state, {
				tempPostingItem: {
					status: {$set: 'FAILURE'},
					data: {$set: {}}
				}
			});
		case types.POSTING_REMOVE_ITEM_REQUEST :
			return update(state, {
				removeItem: {
					status: {$set: 'WAITING'},
					errorCode: {$set: -1}
				}
			});
		case types.POSTING_REMOVE_ITEM_SUCCESS :
			return update(state, {
				removeItem: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.POSTING_REMOVE_ITEM_FAILURE :
			return update(state, {
				removeItem: {
					status: {$set: 'FAILURE'},
					errorCode: {$set: action.errorCode}
				}
			});
		case types.POSTING_MODIFY_ITEM_REQUEST :
			return update(state, {
				modifyItem: {
					status: {$set: 'WAITING'}
				}
			});
		case types.POSTING_MODIFY_ITEM_SUCCESS :
			return update(state, {
				modifyItem: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.POSTING_MODIFY_ITEM_FAILURE :
			return update(state, {
				modifyItem: {
					status: {$set: 'FAILURE'}
				}
			});
		default :
			return state;
	}
}
