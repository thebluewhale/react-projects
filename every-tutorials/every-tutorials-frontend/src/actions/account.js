import {
	ACCOUNT_LOGIN_REQUEST, ACCOUNT_LOGIN_SUCCESS, ACCOUNT_LOGIN_FAILURE,
	ACCOUNT_GET_INFO_REQUEST, ACCOUNT_GET_INFO_SUCCESS, ACCOUNT_GET_INFO_FAILURE,
	ACCOUNT_SIGNUP_REQUEST, ACCOUNT_SIGNUP_SUCCESS, ACCOUNT_SIGNUP_FAILURE,
	ACCOUNT_SIGNUP_CONFIRM_REQUEST, ACCOUNT_SIGNUP_CONFIRM_SUCCESS, ACCOUNT_SIGNUP_CONFIRM_FAILURE,
	ACCOUNT_LOGOUT_REQUEST,
	ACCOUNT_MANAGE_BOOKMARKS_REQUEST, ACCOUNT_MANAGE_BOOKMARKS_SUCCESS, ACCOUNT_MANAGE_BOOKMARKS_FAILURE,
	ACCOUNT_HASBOOKMARKED_REQUEST, ACCOUNT_HASBOOKMARKED_SUCCESS, ACCOUNT_HASBOOKMARKED_FAILURE,
	ACCOUNT_GET_BOOKMARKS_REQUEST, ACCOUNT_GET_BOOKMARKS_SUCCESS, ACCOUNT_GET_BOOKMARKS_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function loginRequest(username, password) {
	return (dispatch) => {
		dispatch(login());

		return axios.post('/account/login', {username, password}).then((response) => {
			dispatch(loginSuccess(username));
		}).catch((error) => {
			dispatch(loginFailure(error.response.data.errorCode));
		});
	}
}

export function login() {
	return {
		type: ACCOUNT_LOGIN_REQUEST
	}
}

export function loginSuccess(username) {
	return {
		type: ACCOUNT_LOGIN_SUCCESS,
		username
	}
}

export function loginFailure(errorCode) {
	console.log(errorCode);
	return {
		type: ACCOUNT_LOGIN_FAILURE,
		errorCode
	}
}

export function signupRequest(username, password, email) {
	return (dispatch) => {
		dispatch(signup());

		return axios.post('/account/signup/temp', {username, password, email}).then((response) => {
			dispatch(signupSuccess());
		}).catch((error) => {
			dispatch(signupFailure(error.response.data.errorCode));
		});
	}
}

export function signup() {
	return {
		type: ACCOUNT_SIGNUP_REQUEST
	}
}

export function signupSuccess() {
	return {
		type: ACCOUNT_SIGNUP_SUCCESS
	}
}

export function signupFailure(errorCode) {
	return {
		type: ACCOUNT_SIGNUP_FAILURE,
		errorCode
	}
}
export function signupConfirmRequest(username, hashvalue) {
	return (dispatch) => {
		dispatch(signupConfirm());

		let confirmURL = `/account/signup/confirm/${username}/${hashvalue}`;
		return axios.get(confirmURL).then((response) => {
			dispatch(signupConfirmSuccess());
		}).catch((error) => {
			dispatch(signupConfirmFailure());
		});
	}
}

export function signupConfirm() {
	return {
		type: ACCOUNT_SIGNUP_CONFIRM_REQUEST
	}
}

export function signupConfirmSuccess() {
	return {
		type: ACCOUNT_SIGNUP_CONFIRM_SUCCESS
	}
}

export function signupConfirmFailure() {
	return {
		type: ACCOUNT_SIGNUP_CONFIRM_FAILURE
	}
}

export function logoutRequest() {
	return (dispatch) => {
		return axios.post('/account/logout').then((response) => {
			console.log('logout sueccess');
			dispatch(logout());
		});
	}
}

export function logout() {
	return {
		type: ACCOUNT_LOGOUT_REQUEST
	}
}

export function accountGetInfoRequest() {
	return (dispatch) => {
		dispatch(accountGetInfo());

		return axios.get('/account/getinfo').then((response) => {
			dispatch(accountGetInfoSuccess(response.data.data));
		}).catch((error) => {
			dispatch(accountGetInfoFailure());
		});
	}
}

export function accountGetInfo() {
	return {
		type: ACCOUNT_GET_INFO_REQUEST
	}
}

export function accountGetInfoSuccess(data) {
	return {
		type: ACCOUNT_GET_INFO_SUCCESS,
		data
	}
}

export function accountGetInfoFailure() {
	return {
		type: ACCOUNT_GET_INFO_FAILURE
	}
}

export function accountManageBookmarksRequest(postingID, postingTitle) {
	return (dispatch) => {
		dispatch(accountManageBookmarks());

		return axios.post('/account/manageBookmarks', {postingID, postingTitle}).then((response) => {
			dispatch(accountManageBookmarksSuccess());
		}).catch((error) => {
			dispatch(accountManageBookmarksFailure());
		});
	}
}

export function accountManageBookmarks() {
	return {
		type: ACCOUNT_MANAGE_BOOKMARKS_REQUEST
	}
}

export function accountManageBookmarksSuccess() {
	return {
		type: ACCOUNT_MANAGE_BOOKMARKS_SUCCESS
	}
}

export function accountManageBookmarksFailure() {
	return {
		type: ACCOUNT_MANAGE_BOOKMARKS_FAILURE
	}
}

export function accountHasBookmarkedRequest(postingID, postingTitle) {
	return (dispatch) => {
		dispatch(accountHasBookmarked());

		return axios.post('/account/hasBookmarked', {postingID, postingTitle}).then((response) => {
			dispatch(accountHasBookmarkedSuccess(response.data.data));
		}).catch((error) => {
			dispatch(accountHasBookmarkedFailure());
		});
	}
}

export function accountHasBookmarked() {
	return {
		type: ACCOUNT_HASBOOKMARKED_REQUEST
	}
}

export function accountHasBookmarkedSuccess(data) {
	return {
		type: ACCOUNT_HASBOOKMARKED_SUCCESS,
		data
	}
}

export function accountHasBookmarkedFailure() {
	return {
		type: ACCOUNT_HASBOOKMARKED_FAILURE
	}
}

export function accountGetBookmarksRequest() {
	return (dispatch) => {
		dispatch(accountGetBookmarks());

		return axios.get('/account/getbookmarks').then((response) => {
			dispatch(accountGetBookmarksSuccess(response.data.data));
		}).catch((error) => {
			dispatch(accountGetBookmarksFailure());
		});
	}
}

export function accountGetBookmarks() {
	return {
		type: ACCOUNT_GET_BOOKMARKS_REQUEST
	}
}

export function accountGetBookmarksSuccess(data) {
	return {
		type: ACCOUNT_GET_BOOKMARKS_SUCCESS,
		data
	}
}

export function accountGetBookmarksFailure() {
	return {
		type: ACCOUNT_GET_BOOKMARKS_FAILURE
	}
}