import {
	AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
	AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE,
	AUTH_GETSTATUS_REQUEST, AUTH_GETSTATUS_SUCCESS, AUTH_GETSTATUS_FAILURE,
	AUTH_LOGOUT_REQUEST
} from './ActionTypes';
import axios from 'axios';

export function loginRequest(username, password) {
	return (dispatch) => {
		dispatch(login());

		return axios.post('/account/signin', {username, password})
		.then((response) => {
			dispatch(loginSuccess(username, response.data));
		}).catch((error) => {
			dispatch(loginFailure());
		});
	};
}

export function login() {
	return {
		type: AUTH_LOGIN_REQUEST
	};
}

export function loginSuccess(username, data) {
	return {
		type: AUTH_LOGIN_SUCCESS,
		username,
		data
	};
}

export function loginFailure() {
	return {
		type: AUTH_LOGIN_FAILURE
	};
}

export function registerRequest(username, password, email) {
	return (dispatch) => {
		dispatch(register());

		return axios.post('/account/signup', {username, password, email})
		.then((response) => {
			dispatch(registerSuccess());
		}).catch((error) => {
			dispatch(registerFailure(error.response.data.code));
		});
	};
}

export function register() {
	return {
		type: AUTH_REGISTER_REQUEST
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

export function getStatusRequest() {
	return (dispatch) => {
		dispatch(getStautus());

		return axios.get('/account/getInfo')
		.then((response) => {
			dispatch(getStatusSuccess(response.data.info.username, response.data));
		}).catch((error) => {
			dispatch(getStatusFailure());
		});
	};
}

export function getStautus() {
	return {
		type: AUTH_GETSTATUS_REQUEST
	};
}

export function getStatusSuccess(username, data) {
	return {
		type: AUTH_GETSTATUS_SUCCESS,
		username,
		data
	};
}

export function getStatusFailure() {
	return {
		type: AUTH_GETSTATUS_FAILURE
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
		type: AUTH_LOGOUT_REQUEST
	};
}
