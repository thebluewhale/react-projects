import {
	FILE_LIST_REQUEST, FILE_LIST_SUCCESS, FILE_LIST_FAILURE,
	FILE_UPLOAD_REQUEST, FILE_UPLOAD_SUCCESS, FILE_UPLOAD_FAILURE,
	FILE_DELETE_REQUEST, FILE_DELETE_SUCCESS, FILE_DELETE_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function fileListRequest(isInitial, requestType, id, wall) {
	return (dispatch) => {
		dispatch(fileList());

		let url = '/file/getList';
		if(!wall) {
			url = isInitial ? url : url + '/' + requestType + '/' + id;
		} else {
			url = isInitial ? url + '/' + wall : url + '/' + requestType + '/' + id + '/' + wall;
		}
		return axios.get(url)
		.then((response) => {
			dispatch(fileListRequestSuccess(response.data.files, isInitial));
		}).catch((error) => {
			dispatch(fileListRequestFailure());
		});
	};
}

export function fileList() {
	return {
		type: FILE_LIST_REQUEST
	};
}

export function fileListRequestSuccess(data, isInitial) {
	return {
		type: FILE_LIST_SUCCESS,
		data,
		isInitial
	};
}

export function fileListRequestFailure() {
	return {
		type: FILE_LIST_FAILURE
	};
}

export function fileUploadRequest(username, uploadFile, uploadFileName) {
	return (dispatch) => {
		dispatch(fileUpload());

		let formData = new FormData();
		formData.append('username', username);
		formData.append('fileHandler', uploadFile);
        formData.append('fileName', uploadFileName);

		let url = '/file/upload/' + username + '/' + uploadFileName;
		return axios.post(url, formData)
		.then((response) => {
			dispatch(fileUploadSuccess());
		}).catch((error) => {
			dispatch(fileUploadFailure(error.response.data.code));
		});
	};
}

export function fileUpload() {
	return {
		type: FILE_UPLOAD_REQUEST
	};
}

export function fileUploadSuccess() {
	return {
		type: FILE_UPLOAD_SUCCESS
	};
}

export function fileUploadFailure(code) {
	return {
		type: FILE_UPLOAD_FAILURE,
		code
	};
}

export function fileDeleteRequest(deleteItemId, itemIndex) {
	return (dispatch) => {
		dispatch(fileDelete());

		return axios.delete('file/delete/' + deleteItemId)
		.then((response) => {
			dispatch(fileDeleteSuccess(itemIndex));
		}).catch((error) => {
			dispatch(fileDeleteFailure(error.response.data.code));
		});
	};
}

export function fileDelete() {
	return {
		type: FILE_DELETE_REQUEST
	};
}

export function fileDeleteSuccess() {
	return {
		type: FILE_DELETE_SUCCESS
	};
}

export function fileDeleteFailure(code) {
	return {
		type: FILE_DELETE_FAILURE,
		code
	};
}
