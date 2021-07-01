import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	status: 'INIT',
	data: []
};

export default function forecastData(state, action) {
	if(typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.GET_FORECASTDATA_REQUEST :
			return update(state, {
				status: {$set: 'WAITING'}
			});
		case types.GET_FORECASTDATA_SUCCESS :
			return update(state, {
				status: {$set: 'SUCCESS'},
				data: {$set: action.data.DailyForecasts}
			});
		case types.GET_FORECASTDATA_FAILURE :
			return update(state, {
				status: {$set: 'FAILURE'}
			});
		default :
			return state;
	}
}
