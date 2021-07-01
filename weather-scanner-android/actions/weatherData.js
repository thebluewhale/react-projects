import {
	GET_WEATHERDATA_REQUEST,
	GET_WEATHERDATA_SUCCESS,
	GET_WEATHERDATA_FAILURE
} from './ActionTypes';
import {demoCurrentResponse} from '../utils/config';

export function getWeatherdataRequest(url) {
	return (dispatch) => {
		dispatch(getWeatherdata());

		return new Promise((resolve, reject) => {
			/*
			fetch(url)
			.then((response) => response.json())
			.then((responseJSON) => {
				if(responseJSON) {
					dispatch(getWeatherdataSuccess(responseJSON));
				} else {
					dispatch(getWeatherdataFailure());
				}
				resolve();
			});
			*/
			dispatch(getWeatherdataSuccess(demoCurrentResponse));
			resolve();
		});
	};
}

export function getWeatherdata() {
	return {
		type: GET_WEATHERDATA_REQUEST
	};
}

export function getWeatherdataSuccess(weatherData) {
	return {
		type: GET_WEATHERDATA_SUCCESS,
		data: weatherData
	};
}

export function getWeatherdataFailure() {
	return {
		type: GET_WEATHERDATA_FAILURE
	};
}
