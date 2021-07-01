import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	posting: {
		status: 'INIT',
		data: [],
		isLast: false
	}
};

export default function getPostingData(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.GET_POSTINGDATA_REQUEST :
			return update(state, {
				posting: {
					status: {$set: 'INIT'}
				}
			});
		case types.GET_POSTINGDATA_SUCCESS :
			if(action.isInitial) {
				return update(state, {
					posting: {
						status: {$set: 'SUCCESS'},
						data: {$set: action.data},
						isLast: {$set: action.data.length < 40}
					}
				});
			} else {
				return update(state, {
					posting: {
						status: {$set: 'SUCCESS'},
						data: {$push: action.data},
						isLast: {$set: action.data.length < 40}
					}
				});
			}
			return state;
		case types.GET_POSTINGDATA_FAILURE :
			return update(state, {
				posting: {
					status: {$set: 'FAILURE'},
					data: {$set: []}
				}
			});
		default :
			return state;
	}
}
