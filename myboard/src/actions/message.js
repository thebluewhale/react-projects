import {
	MESSAGE_SEND, MESSAGE_SEND_SUCCESS, MESSAGE_SEND_FAILURE,
	MESSAGE_LIST, MESSAGE_LIST_SUCCESS, MESSAGE_LIST_FAILURE,
	MESSAGE_REMOVE, MESSAGE_REMOVE_SUCCESS, MESSAGE_REMOVE_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function messageSendRequest(to, contents) {
	return (dispatch) => {
		dispatch(messageSend());

		return axios.post('/message/send/' + to, {contents})
		.then((response) => {
			dispatch(messageSendSuccess());
		}).catch((error) => {
			dispatch(messageSendFailure(error.response.data.code));
		});

	};
}

export function messageSend() {
	return {
		type: MESSAGE_SEND
	};
}

export function messageSendSuccess() {
	return {
		type: MESSAGE_SEND_SUCCESS
	};
}

export function messageSendFailure(error) {
	return {
		type: MESSAGE_SEND_FAILURE,
		error
	};
}

export function messageListRequest(username) {
	return (dispatch) => {
		dispatch(messageList());

		let url = '/message/read/' + username;

		return axios.get(url)
		.then((response) => {
			dispatch(messageListSuccess(response.data));
		}).catch((error) => {
			dispatch(messageListFailure());
		});
	};
}

export function messageList() {
	return {
		type: MESSAGE_LIST
	};
}

export function messageListSuccess(data) {
	return {
		type: MESSAGE_LIST_SUCCESS,
		data
	};
}

export function messageListFailure() {
	return {
		type: MESSAGE_LIST_FAILURE
	};
}

export function messageRemoveRequest(id, index) {
	return (dispatch) => {
		dispatch(messageRemove());

		return axios.delete('/message/remove/' + id)
		.then((response) => {
			dispatch(messageRemoveSuccess(index));
		}).catch((error) => {
			dispatch(messageRemoveFailure(error.response.data.code));
		});
	};
}

export function messageRemove() {
	return {
		type: MESSAGE_REMOVE
	};
}

export function messageRemoveSuccess(index) {
	return {
		type: MESSAGE_REMOVE_SUCCESS,
		index
	};
}

export function messageRemoveFailure(error) {
	return {
		type: MESSAGE_REMOVE_FAILURE,
		error
	};
}
