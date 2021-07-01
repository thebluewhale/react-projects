import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	addNew: {
		status: 'INIT'
	},
	getAll: {
		status: 'INIT',
		markers: []
	},
	update: {
		status: 'INIT'
	},
	delete: {
		status: 'INIT'
	},
	getByKeyword: {
		status: 'INIT',
		markers: []
	}
};

export default function account(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.MARKER_ADDNEWMARKER_REQUEST :
			return update(state, {
				addNew: {
					status: {$set: 'WAITING'}
				}
			});
		case types.MARKER_ADDNEWMARKER_SUCCESS :
			return update(state, {
				addNew: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.MARKER_ADDNEWMARKER_FAILURE :
			return update(state, {
				addNew: {
					status: {$set: 'FAILURE'}
				}
			});
		case types.MARKER_GETALLMARKERS_REQUEST :
			return update(state, {
				getAll: {
					status: {$set: 'WAITING'},
					markers: {$set: []}
				}
			});
		case types.MARKER_GETALLMARKERS_SUCCESS :
			return update(state, {
				getAll: {
					status: {$set: 'SUCCESS'},
					markers: {$set: action.markers}
				}
			});
		case types.MARKER_GETALLMARKERS_FAILURE :
			return update(state, {
				getAll: {
					status: {$set: 'FAILURE'},
					markers: {$set: []}
				}
			});
		case types.MARKER_UPDATEMARKER_REQUEST :
			return update(state, {
				update: {
					status: {$set: 'WAITING'}
				}
			});
		case types.MARKER_UPDATEMARKER_SUCCESS :
			return update(state, {
				update: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.MARKER_UPDATEMARKER_FAILURE :
			return update(state, {
				update: {
					status: {$set: 'FAILURE'}
				}
			});
		case types.MARKER_DELETEMARKER_REQUEST :
			return update(state, {
				delete: {
					status: {$set: 'WAITING'}
				}
			});
		case types.MARKER_DELETEMARKER_SUCCESS :
			return update(state, {
				delete: {
					status: {$set: 'SUCCESS'}
				}
			});
		case types.MARKER_DELETEMARKER_FAILURE :
			return update(state, {
				delete: {
					status: {$set: 'FAILURE'}
				}
			});
		case types.MARKER_GETMARKERS_BYKEYWORD_REQUEST :
			return update(state, {
				getByKeyword: {
					status: {$set: 'WAITING'}
				}
			});
		case types.MARKER_GETMARKERS_BYKEYWORD_SUCCESS :
			return update(state, {
				getByKeyword: {
					status: {$set: 'SUCCESS'},
					markers: {$set: action.markers}
				}
			});
		case types.MARKER_GETMARKERS_BYKEYWORD_FAILURE :
			return update(state, {
				getByKeyword: {
					status: {$set: 'FAILURE'},
					markers: {$set: []}
				}
			});
		default :
			return state;
	}
}
