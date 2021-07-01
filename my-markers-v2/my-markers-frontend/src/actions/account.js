import {
	ACCOUNT_ADDNEWUSER_REQUEST, ACCOUNT_ADDNEWUSER_SUCCESS, ACCOUNT_ADDNEWUSER_FAILURE,
	ACCOUNT_LOGIN_REQUEST, ACCOUNT_LOGIN_SUCCESS, ACCOUNT_LOGIN_FAILURE,
	ACCOUNT_CHECKTOKEN_REQUEST, ACCOUNT_CHECKTOKEN_SUCCESS, ACCOUNT_CHECKTOKEN_FAILURE, ACCOUNT_LOGOUT_SUCCESS,
	ACCOUNT_GETINFO_REQUEST, ACCOUNT_GETINFO_SUCCESS, ACCOUNT_GETINFO_FAILURE,
	ACCOUNT_DELETEUSER_REQUEST, ACCOUNT_DELETEUSER_SUCCESS, ACCOUNT_DELETEUSER_FAILURE,
	ACCOUNT_SENDTEMPPASSWORD_REQUEST, ACCOUNT_SENDTEMPPASSWORD_SUCCESS, ACCOUNT_SENDTEMPPASSWORD_FAILURE,
	ACCOUNT_UPDATEUSER_REQUEST, ACCOUNT_UPDATEUSER_SUCCESS, ACCOUNT_UPDATEUSER_FAILURE
} from './ActionTypes';
import axios from 'axios';

//const DEFAULT_URL = 'https://jtpiu9tu6b.execute-api.ap-northeast-2.amazonaws.com/dev/';
const DEFAULT_URL = '/api';

export function addNewUserRequest(username, password, email) {
	return (dispatch) => {
		dispatch(addNewUser());

		let fullURL = DEFAULT_URL + '/user/addnewuser';
		return axios.post(fullURL, {username, password, email}).then((response) => {
			dispatch(addNewUserSuccess());
		}).catch((error) => {
			dispatch(addNewUserFailure(error.response.data));
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

export function addNewUserFailure(data) {
	return {
		type: ACCOUNT_ADDNEWUSER_FAILURE,
		data
	}
}

export function loginRequest(username, password) {
	return (dispatch) => {
		dispatch(login());

		let fullURL = DEFAULT_URL + '/user/login';
		return axios.post(fullURL, {username, password}).then((response) => {
			dispatch(loginSuccess(response.data));
		}).catch((error) => {
			dispatch(loginFailure(error.response.data));
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

export function loginFailure(data) {
	return {
		type: ACCOUNT_LOGIN_FAILURE,
		data
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

export function logoutRequest() {
	return (dispatch) => {
		let fullURL = DEFAULT_URL + '/user/logout';
		return axios.post(fullURL).then((response) => {
			dispatch(logoutSuccess());
		});
	}
}

export function logoutSuccess() {
	return {
		type: ACCOUNT_LOGOUT_SUCCESS
	}
}

export function getAccountInfoRequest() {
	return (dispatch) => {
		dispatch(getAccountInfo());

		let fullURL = DEFAULT_URL + '/user/getaccountinfo';
		return axios.get(fullURL).then((response) => {
			let accountInfo = response.data.accountInfo;
			dispatch(getAccountInfoSuccess(accountInfo));
		}).catch((error) => {
			dispatch(getAccountInfoFailure());
		});
	}
}

export function getAccountInfo() {
	return {
		type: ACCOUNT_GETINFO_REQUEST
	}
}

export function getAccountInfoSuccess(accountInfo) {
	return {
		type: ACCOUNT_GETINFO_SUCCESS,
		accountInfo
	}
}

export function getAccountInfoFailure() {
	return {
		type: ACCOUNT_GETINFO_FAILURE
	}
}

export function deleteUserRequest(deleteConfirmPassword) {
	return (dispatch) => {
		dispatch(deleteUser());

		let fullURL = DEFAULT_URL + '/user/deleteuser';
		return axios.post(fullURL, {deleteConfirmPassword}).then((response) => {
			dispatch(deleteUserSuccess());
		}).catch((error) => {
			dispatch(deleteUserFailure(error.response.data));
		});
	}
}

export function deleteUser() {
	return {
		type: ACCOUNT_DELETEUSER_REQUEST
	}
}

export function deleteUserSuccess() {
	return {
		type: ACCOUNT_DELETEUSER_SUCCESS
	}
}

export function deleteUserFailure(data) {
	return {
		type: ACCOUNT_DELETEUSER_FAILURE,
		data
	}
}

export function sendTempPasswordRequest(username) {
	return (dispatch) => {
		dispatch(sendTempPassword());

		let fullURL = DEFAULT_URL + `/user/sendtemppassword/${username}`;
		return axios.post(fullURL).then((response) => {
			dispatch(sendTempPasswordSuccess());
		}).catch((error) => {
			dispatch(sendTempPasswordFailure());
		});
	}
}

export function sendTempPassword() {
	return {
		type: ACCOUNT_SENDTEMPPASSWORD_REQUEST
	}
}

export function sendTempPasswordSuccess() {
	return {
		type: ACCOUNT_SENDTEMPPASSWORD_SUCCESS
	}
}

export function sendTempPasswordFailure() {
	return {
		type: ACCOUNT_SENDTEMPPASSWORD_FAILURE
	}
}

export function updateUserRequest(username, cur_password, new_password, new_email) {
	return (dispatch) => {
		dispatch(updateUser());

		let fullURL = DEFAULT_URL + `/user/updateuser/${username}`;
		let newData = {
			cur_password: cur_password || null,
			new_password: new_password || null,
			new_email: new_email || null
		}
		return axios.patch(fullURL, {newData}).then((response) => {
			let accountInfo = response.data.accountInfo;
			dispatch(updateUserSuccess(accountInfo));
		}).catch((error) => {
			dispatch(updateUserFailure(error.response.data));
		});
	}
}

export function updateUser() {
	return {
		type: ACCOUNT_UPDATEUSER_REQUEST
	}
}

export function updateUserSuccess(accountInfo) {
	return {
		type: ACCOUNT_UPDATEUSER_SUCCESS,
		accountInfo
	}
}

export function updateUserFailure(data) {
	return {
		type: ACCOUNT_UPDATEUSER_FAILURE,
		data
	}
}