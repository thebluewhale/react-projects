import {
	AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
	AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE,
	AUTH_GET_STATUS_REQUEST, AUTH_GET_STATUS_SUCCESS, AUTH_GET_STATUS_FAILURE,
	AUTH_LOGOUT
} from './ActionTypes';
import axios from 'axios';

export function loginRequest(username, password) {
	return (dispatch) => {
		dispatch(login());

		return axios.post('/account/login', {username, password})
		.then((response) => {
			dispatch(loginRequestSuccess(username, response.data));
		}).catch((error) => {
			dispatch(loginRequestFailure(error.response.data.code));
		});
	};
}

export function login() {
	return {
		type: AUTH_LOGIN_REQUEST
	};
}

export function loginRequestSuccess(username, data) {
	return {
		type: AUTH_LOGIN_SUCCESS,
		username,
		data
	};
}

export function loginRequestFailure(code) {
	return {
		type: AUTH_LOGIN_FAILURE,
		code
	};
}

export function registerRequest(username, password, email) {
	return (dispatch) => {
		dispatch(register());

		return axios.post('/account/register', {username, password, email})
		.then((response) => {
			dispatch(registerRequestSuccess());
		}).catch((error) => {
			dispatch(registerRequestFailure(error.response.data.code));
		});
	};
}

export function register() {
	return {
		type: AUTH_REGISTER_REQUEST
	};
}

export function registerRequestSuccess() {
	return {
		type: AUTH_REGISTER_SUCCESS
	};
}

export function registerRequestFailure(code) {
	return {
		type: AUTH_REGISTER_FAILURE,
		code
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
		type: AUTH_GET_STATUS_REQUEST
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
