import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	timetable: {
		status: 'INIT',
		data: [],
		isLast: false
	}
};

export default function getTimetableData(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.GET_TIMETABLE_DATA_REQUEST :
			return update(state, {
				timetable: {
					status: {$set: 'INIT'}
				}
			});
		case types.GET_TIMETABLE_DATA_SUCCESS :
			if (action.isInitial) {
				return update(state, {
					timetable: {
						status: {$set: 'SUCCESS'},
						data: {$set: action.data},
						isLast: {$set: action.data.length < 20}
					}
				});
			} else {
				return update(state, {
					timetable: {
						status: {$set: 'SUCCESS'},
						data: {$push: action.data},
						isLast: {$set: action.data.length < 20}
					}
				});
			}
		case types.GET_TIMETABLE_DATA_FAILURE :
			return update(state, {
				timetable: {
					status: {$set: 'FAILURE'},
					data: {$set: []}
				}
			});
		case types.SEARCH_TIMETABLE_DATA_REQUEST :
			return update(state, {
				timetable: {
					status: {$set: 'INIT'}
				}
			});
		case types.SEARCH_TIMETABLE_DATA_SUCCESS :
			return update(state, {
				timetable: {
					status: {$set: 'SUCCESS'},
					data: {$set: action.data},
					isLast: {$set: action.data.length < 20}
				}
			});
		case types.SEARCH_TIMETABLE_DATA_FAILURE :
			return update(state, {
				timetable: {
					status: {$set: 'FAILURE'},
					data: {$set: []}
				}
			});
		case types.CLEAR_TIMETABLE_DATA :
			return update(state, {
				timetable: {
					status: {$set: 'INIT'},
					data: {$set: []}
				}
			});
		default :
			return state;
	}
}
