import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	/*
	someData : {
		status: 'INIT'
	}
	*/
};

export default function reducerSample(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		/*
		case types.SOME_ACTION_CASE :
			return update(state, {
				someData: {
					status: {$set: 'OTHER_STATE'}
				}
			});
		*/
		default :
			return state;
	}
}
