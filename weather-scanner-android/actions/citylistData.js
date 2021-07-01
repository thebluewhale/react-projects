import {
	GET_CITYLISTDATA_REQUEST,
	GET_CITYLISTDATA_SUCCESS,
	GET_CITYLISTDATA_FAILURE
} from './ActionTypes';
import {demoCitylistResponse} from '../utils/config';

export function getCityListdataRequest(url) {
	return (dispatch) => {
		dispatch(getCityListdata());

		return new Promise((resolve, reject) => {
			/*
			fetch(url)
			.then((response) => response.json())
			.then((responseJSON) => {
				if(responseJSON) {
					dispatch(getCityListdataSuccess(responseJSON));
				} else {
					dispatch(getCityListdataFailure());
				}
				resolve();
			});
			*/
			dispatch(getCityListdataSuccess(demoCitylistResponse));
			resolve();
		});
	};
}

export function getCityListdata() {
	return {
		type: GET_CITYLISTDATA_REQUEST
	};
}

export function getCityListdataSuccess(citylistData) {
	return {
		type: GET_CITYLISTDATA_SUCCESS,
		data: citylistData
	};
}

export function getCityListdataFailure() {
	return {
		type: GET_CITYLISTDATA_FAILURE
	};
}
