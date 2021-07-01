import {
	CHAT_SEND_MESSAGE, CHAT_SEND_MESSAGE_SUCCESS, CHAT_SEND_MESSAGE_FAILURE,
	CHAT_GET_MESSAGE, CHAT_GET_MESSAGE_SUCCESS, CHAT_GET_MESSAGE_FAILURE,
	CHAT_GET_CHATLIST, CHAT_GET_CHATLIST_SUCCESS, CHAT_GET_CHATLIST_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function sendMessageRequest(contents, from, to) {
	return (dispatch) => {
		dispatch(sendMessage());

		let url = '/chat/send/' + from + '/' + to;
		return axios.post(url, {contents})
		.then((response) => {
			dispatch(sendMessageSuccess());
		}).catch((error) => {
			dispatch(sendMessageFailure(error.response.data.code));
		});
	};
}

export function sendMessage() {
	return {
		type: CHAT_SEND_MESSAGE
	};
}

export function sendMessageSuccess() {
	return {
		type: CHAT_SEND_MESSAGE_SUCCESS
	};
}

export function sendMessageFailure(error) {
	return {
		type: CHAT_SEND_MESSAGE_FAILURE,
		error
	};
}

export function getMessageRequest(me, partner, isInitial, id) {
	return (dispatch) => {
		dispatch(getMessage());

		let url = '/chat/message/' + me + '/' + partner + '/' + isInitial + '/' + id;
		return axios.get(url)
		.then((response) => {
			dispatch(getMessageSuccess(response.data.data, partner, isInitial));
		}).catch((error) => {
			dispatch(getMessageFailure());
		});
	};
}

export function getMessage() {
	return {
		type: CHAT_GET_MESSAGE
	};
}

export function getMessageSuccess(data, partner, isInitial) {
	return {
		type: CHAT_GET_MESSAGE_SUCCESS,
		data,
		partner,
		isInitial
	};
}

export function getMessageFailure() {
	return {
		type: CHAT_GET_MESSAGE_FAILURE
	};
}

export function getChatListRequest(username) {
	return (dispatch) => {
		dispatch(getChatList());

		let url = '/chat/list/' + username;
		return axios.get(url)
		.then((response) => {
			dispatch(getChatListSuccess(response.data.data));
		}).catch((error) => {
			dispatch(getChatListFailure());
		});
	};
}

export function getChatList() {
	return {
		type: CHAT_GET_CHATLIST
	};
}

export function getChatListSuccess(data) {
	return {
		type: CHAT_GET_CHATLIST_SUCCESS,
		data
	};
}

export function getChatListFailure() {
	return {
		type: CHAT_GET_CHATLIST_FAILURE
	};
}
