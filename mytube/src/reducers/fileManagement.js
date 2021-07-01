import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	upload: {
		status: 'INIT',
		errorCode: -1
	},
	list: {
		status: 'INIT',
		data: [],
		isLast: false
	},
	delete: {
		status: 'INIT',
		errorCode: -1
	}
};

export default function fileList(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.FILE_LIST_REQUEST :
			return update(state, {
				list: {
					status: {$set: 'WAITING'}
				}
			});
		case types.FILE_LIST_SUCCESS :
			if(action.isInitial) {
				return update(state, {
					list: {
						status: {$set: 'SUCCESS'},
						data: {$set: action.data},
						isLast: {$set: action.data.length < 6}
					}
				});
			} else {
				if(action.requestType === 'new') {
					return update(state, {
						list: {
							status: {$set: 'SUCCESS'},
							data: {$unshift: action.data}
						}
					});
				} else {
					return update(state, {
						list: {
							status: {$set: 'SUCCESS'},
							data: {$push: action.data},
							isLast: {$set: action.data.length < 6}
						}
					});
				}
			}
			return state;
		case types.FILE_LIST_FAILURE :
			return update(state, {
				list: {
					status: {$set: 'FAILURE'},
					data: {$set: []}
				}
			});
		case types.FILE_UPLOAD_REQUEST :
			return update(state, {
				upload: {
					status: {$set: 'WAITING'},
					errorCode: {$set: -1}
				}
			});
		case types.FILE_UPLOAD_SUCCESS :
			return update(state, {
				upload: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.FILE_UPLOAD_FAILURE :
			return update(state, {
				upload: {
					status: {$set: 'FAILURE'},
					errorCode: {$set: action.code}
				}
			});
		case types.FILE_DELETE_REQUEST :
			return update(state, {
				delete: {
					status: {$set: 'WAITING'},
					errorCode: {$set: -1}
				}
			});
		case types.FILE_DELETE_SUCCESS :
			return update(state, {
				delete: {
					status: {$set: 'SUCCESS'}
				},
				list: {
					data: {$splice: [[action.itemIndex, 1]]}
				}
			});
		case types.FILE_DELETE_FAILURE :
			return update(state, {
				delete: {
					status: {$set: 'FAILURE'},
					errorCode: {$set: action.code}
				}
			});
		default :
			return state;
	}
}
