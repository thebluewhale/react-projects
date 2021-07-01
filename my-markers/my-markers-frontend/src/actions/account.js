import {
	ACCOUNT_ADDNEWUSER_REQUEST, ACCOUNT_ADDNEWUSER_SUCCESS, ACCOUNT_ADDNEWUSER_FAILURE,
	ACCOUNT_LOGIN_REQUEST, ACCOUNT_LOGIN_SUCCESS, ACCOUNT_LOGIN_FAILURE,
	ACCOUNT_CHECKTOKEN_REQUEST, ACCOUNT_CHECKTOKEN_SUCCESS, ACCOUNT_CHECKTOKEN_FAILURE
} from './ActionTypes';
import axios from 'axios';

const DEFAULT_URL = 'https://jtpiu9tu6b.execute-api.ap-northeast-2.amazonaws.com/dev/';

export function addNewUserRequest(username, password, email) {
	return (dispatch) => {
		dispatch(addNewUser());

		let fullURL = DEFAULT_URL + '/user/addnewuser';
		return axios.post(fullURL, {username, password, email}).then((response) => {
			dispatch(addNewUserSuccess());
		}).catch((error) => {
			dispatch(addNewUserFailure());
		});
	}
}

export function addNewUser() {
	return {
		type: ACCOUNT_ADDNEWUSER_REQUEST
	}
}

export function addNewUserSuccess() {
	return {
		type: ACCOUNT_ADDNEWUSER_SUCCESS
	}
}

export function addNewUserFailure() {
	return {
		type: ACCOUNT_ADDNEWUSER_FAILURE
	}
}

export function loginRequest(username, password) {
	return (dispatch) => {
		dispatch(login());

		let fullURL = DEFAULT_URL + '/user/login';
		return axios.post(fullURL, {username, password}).then((response) => {
			dispatch(loginSuccess(response.data));
		}).catch((error) => {
			dispatch(loginFailure());
		});
	}
}

export function login() {
	return {
		type: ACCOUNT_LOGIN_REQUEST
	}
}

export function loginSuccess(data) {
	return {
		type: ACCOUNT_LOGIN_SUCCESS,
		data
	}
}

export function loginFailure() {
	return {
		type: ACCOUNT_LOGIN_FAILURE
	}
}

export function checkTokenRequest(access_token) {
	return (dispatch) => {
		dispatch(checkToken());

		let fullURL = DEFAULT_URL + '/user/checktoken';
		return axios.post(fullURL, {access_token}).then((response) => {
			let res = response.data.success;
			dispatch(checkTokenSuccess(res));
		}).catch((error) => {
			dispatch(checkTokenFailure());
		});
	}
}

export function checkToken() {
	return {
		type: ACCOUNT_CHECKTOKEN_REQUEST
	}
}

export function checkTokenSuccess(res) {
	return {
		type: ACCOUNT_CHECKTOKEN_SUCCESS,
		res
	}
}

export function checkTokenFailure() {
	return {
		type: ACCOUNT_CHECKTOKEN_FAILURE
	}
}