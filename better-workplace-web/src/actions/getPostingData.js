import {
	GET_POSTINGDATA_REQUEST, GET_POSTINGDATA_SUCCESS, GET_POSTINGDATA_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function getPostingDataRequest(isInitial, lastId, keyword) {
	return (dispatch) => {
		dispatch(getPostingData());

		let url = '/getPostingData/';
		if(keyword === undefined) {
			url = isInitial ? url : `${url}/${lastId}`;
		} else {
			url = isInitial ? `${url}/search/${keyword}` : `${url}/search/${keyword}/${lastId}`;
		}

		return axios.get(url).then((response) => {
			dispatch(getPostingDataSuccess(isInitial, response.data));
		}).catch((error) => {
			dispatch(getPostingDataFailure());
		});
	};
}

export function getPostingData() {
	return {
		type: GET_POSTINGDATA_REQUEST
	};
}

export function getPostingDataSuccess(isInitial, data) {
	return {
		type: GET_POSTINGDATA_SUCCESS,
		data: data,
		isInitial: isInitial
	};
}

export function getPostingDataFailure() {
	return {
		type: GET_POSTINGDATA_FAILURE
	};
}
