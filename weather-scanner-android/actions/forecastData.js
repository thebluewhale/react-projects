import {
	GET_FORECASTDATA_REQUEST,
	GET_FORECASTDATA_SUCCESS,
	GET_FORECASTDATA_FAILURE
} from './ActionTypes';
import {demoForecastResponse} from '../utils/config';

export function getForecastdataRequest(url) {
	return (dispatch) => {
		dispatch(getForecastdata());

		return new Promise((resolve, reject) => {
			/*
			fetch(url)
			.then((response) => response.json())
			.then((responseJSON) => {
				if(responseJSON) {
					dispatch(getForecastdataSuccess(responseJSON));
				} else {
					dispatch(getForecastdataFailure());
				}
				resolve();
			});
			*/
			dispatch(getForecastdataSuccess(demoForecastResponse));
			resolve();

		});
	};
}

export function getForecastdata() {
	return {
		type: GET_FORECASTDATA_REQUEST
	};
}

export function getForecastdataSuccess(forecastData) {
	return {
		type: GET_FORECASTDATA_SUCCESS,
		data: forecastData
	};
}

export function getForecastdataFailure() {
	return {
		type: GET_FORECASTDATA_FAILURE
	};
}
