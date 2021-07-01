import {
	SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function searchUserRequest(keyword) {
	return (dispatch) => {
		dispatch(searchUser());

		return axios.get('/search/user/' + keyword)
		.then((response) => {
			dispatch(searchUserRequestSuccess(response.data));
		}).catch((error) => {
			dispatch(searchUserRequestFailure());
		});
	};
}

export function searchUser() {
	return {
		type: SEARCH_USER_REQUEST
	};
}

export function searchUserRequestSuccess(data) {
	return {
		type: SEARCH_USER_SUCCESS,
		data
	};
}

export function searchUserRequestFailure() {
	return {
		type: SEARCH_USER_FAILURE
	};
}
