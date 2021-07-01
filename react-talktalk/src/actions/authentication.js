import {
	AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT,
	AUTH_REGISTER, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE,
	AUTH_SEARCH, AUTH_SEARCH_SUCCESS, AUTH_SEARCH_FAILURE,
	AUTH_GET_STATUS, AUTH_GET_STATUS_SUCCESS, AUTH_GET_STATUS_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function loginRequest(username, password) {
	return (dispatch) => {
		dispatch(login());

		return axios.post('/account/login', {username, password})
		.then((response) => {
			dispatch(loginSuccess(username, response.data.accountData));
		}).catch((error) => {
			dispatch(loginFailure(error.response.data.code));
		});
	};
}

export function login() {
	return {
		type: AUTH_LOGIN
	};
}

export function loginSuccess(username, data) {
	return {
		type: AUTH_LOGIN_SUCCESS,
		username,
		data
	};
}

export function loginFailure(error) {
	return {
		type: AUTH_LOGIN_FAILURE,
		error
	};
}

export function logoutRequest() {
	return (dispatch) => {
		return axios.post('/account/logout')
		.then((response) => {
			dispatch(logout());
		});
	};
}

export function logout() {
	return {
		type: AUTH_LOGOUT
	};
}

export function registerRequest(username, password, email) {
	return (dispatch) => {
		dispatch(register());

		return axios.post('/account/register', {username, password, email})
		.then((response) => {
			dispatch(registerSuccess());
		}).catch((error) => {
			dispatch(registerFailure(error.response.data.code));
		});
	};
}

export function register() {
	return {
		type: AUTH_REGISTER
	};
}

export function registerSuccess() {
	return {
		type: AUTH_REGISTER_SUCCESS
	};
}

export function registerFailure(error) {
	return {
		type: AUTH_REGISTER_FAILURE,
		error
	};
}

export function searchUserRequest(keyword) {
	return (dispatch) => {
		searchUser();

		let url = '/account/search/' + keyword;
		return axios.get(url)
		.then((response) => {
			dispatch(searchUserSuccess(response.data));
		}).catch((error) => {
			dispatch(searchUserFailure(error.response.data.code));
		});
	};
}

export function searchUser() {
	return {
		type: AUTH_SEARCH
	};
}

export function searchUserSuccess(data) {
	return {
		type: AUTH_SEARCH_SUCCESS,
		data
	};
}

export function searchUserFailure(error) {
	return {
		type: AUTH_SEARCH_FAILURE,
		error
	};
}

export function getStatusRequest() {
	return (dispatch) => {
		dispatch(getStatus());

		return axios.get('/account/getinfo')
		.then((response) => {
			dispatch(getStatusSuccess(response.data.info.username, response.data));
		}).catch((error) => {
			dispatch(getStatusFailure());
		});
	};
}

export function getStatus() {
	return {
		type: AUTH_GET_STATUS
	};
}

export function getStatusSuccess(username, data) {
	return {
		type: AUTH_GET_STATUS_SUCCESS,
		username,
		data
	};
}

export function getStatusFailure() {
	return {
		type: AUTH_GET_STATUS_FAILURE
	};
}
