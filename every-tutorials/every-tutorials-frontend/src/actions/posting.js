import {
	POSTING_POST_NEW_REQUEST, POSTING_POST_NEW_SUCCESS, POSTING_POST_NEW_FAILURE,
	POSTING_SAVE_TEMP_REQUEST, POSTING_SAVE_TEMP_SUCCESS, POSTING_SAVE_TEMP_FAILURE,
	POSTING_LOAD_ALL_REQUEST, POSTING_LOAD_ALL_SUCCESS, POSTING_LOAD_ALL_FAILURE,
	POSTING_READ_ITEM_REQUEST, POSTING_READ_ITEM_SUCCESS, POSTING_READ_ITEM_FAILURE,
	POSTING_LOAD_TEMP_LIST_REQUEST, POSTING_LOAD_TEMP_LIST_SUCCESS, POSTING_LOAD_TEMP_LIST_FAILURE,
	POSTING_LOAD_TEMP_ITEM_REQUEST, POSTING_LOAD_TEMP_ITEM_SUCCESS, POSTING_LOAD_TEMP_ITEM_FAILURE,
	POSTING_LOAD_BY_CATEGORY_REQUEST, POSTING_LOAD_BY_CATEGORY_SUCCESS, POSTING_LOAD_BY_CATEGORY_FAILURE,
	POSTING_REMOVE_ITEM_REQUEST, POSTING_REMOVE_ITEM_SUCCESS, POSTING_REMOVE_ITEM_FAILURE,
	POSTING_MODIFY_ITEM_REQUEST, POSTING_MODIFY_ITEM_SUCCESS, POSTING_MODIFY_ITEM_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function postNewPostingRequest(data) {
	return (dispatch) => {
		dispatch(postNewPosting());

		return axios.post('/posting/post/new', data).then((response) => {
			dispatch(postNewPostingSuccess());
		}).catch((error) => {
			dispatch(postNewPostingFailure());
		});
	}
}

export function postNewPosting() {
	return {
		type: POSTING_POST_NEW_REQUEST
	}
}

export function postNewPostingSuccess() {
	return {
		type: POSTING_POST_NEW_SUCCESS
	}
}

export function postNewPostingFailure() {
	return {
		type: POSTING_POST_NEW_FAILURE
	}
}

export function saveTempPostingRequest(data) {
	return (dispatch) => {
		dispatch(saveTempPosting());

		return axios.post('/posting/save/temp', data).then((response) => {
			dispatch(saveTempPostingSuccess());
		}).catch((error) => {
			dispatch(saveTempPostingFailure());
		});
	}
}

export function saveTempPosting() {
	return {
		type: POSTING_SAVE_TEMP_REQUEST
	}
}

export function saveTempPostingSuccess() {
	return {
		type: POSTING_SAVE_TEMP_SUCCESS
	}
}

export function saveTempPostingFailure() {
	return {
		type: POSTING_SAVE_TEMP_FAILURE
	}
}

export function loadAllPostingsRequest() {
	return (dispatch) => {
		dispatch(loadAllPostings());

		return axios.get('/posting/load/all').then((response) => {
			dispatch(loadAllPostingsSuccess(response.data));
		}).catch((error) => {
			dispatch(loadAllPostingsFailure());
		});
	}
}

export function loadAllPostings() {
	return {
		type: POSTING_LOAD_ALL_REQUEST
	}
}

export function loadAllPostingsSuccess(data) {
	return {
		type: POSTING_LOAD_ALL_SUCCESS,
		data
	}
}

export function loadAllPostingsFailure() {
	return {
		type: POSTING_LOAD_ALL_FAILURE
	}
}

export function loadPostingsByCategoryRequest(category) {
	return (dispatch) => {
		dispatch(loadPostingsByCategory());

		let url = `/posting/load/bycategory/${category}`;
		return axios.get(url).then((response) => {
			dispatch(loadPostingsByCategorySuccess(response.data));
		}).catch((error) => {
			dispatch(loadPostingsByCategoryFailure());
		});
	}
}

export function loadPostingsByCategory() {
	return {
		type: POSTING_LOAD_BY_CATEGORY_REQUEST
	}
}

export function loadPostingsByCategorySuccess(data) {
	return {
		type: POSTING_LOAD_BY_CATEGORY_SUCCESS,
		data
	}
}

export function loadPostingsByCategoryFailure() {
	return {
		type: POSTING_LOAD_BY_CATEGORY_FAILURE
	}
}

export function readPostingItemRequest(postingId) {
	return (dispatch) => {
		dispatch(readPostingItem());

		return axios.get(`/posting/read/${postingId}`).then((response) => {
			dispatch(readPostingItemSuccess(response.data));
		}).catch((error) => {
			dispatch(readPostingItemFailure());
		});
	}
}

export function readPostingItem() {
	return {
		type: POSTING_READ_ITEM_REQUEST
	}
}

export function readPostingItemSuccess(data) {
	return {
		type: POSTING_READ_ITEM_SUCCESS,
		data
	}
}

export function readPostingItemFailure() {
	return {
		type: POSTING_READ_ITEM_FAILURE
	}
}

export function loadTempPostingsListRequest(author) {
	return (dispatch) => {
		dispatch(loadTempPostingsList());

		return axios.get(`/posting/load/temp/list/${author}`).then((response) => {
			dispatch(loadTempPostingsListSuccess(response.data));
		}).catch((error) => {
			dispatch(loadTempPostingsListFailure());
		});
	}
}

export function loadTempPostingsList() {
	return {
		type: POSTING_LOAD_TEMP_LIST_REQUEST
	}
}

export function loadTempPostingsListSuccess(data) {
	return {
		type: POSTING_LOAD_TEMP_LIST_SUCCESS,
		data
	}
}

export function loadTempPostingsListFailure() {
	return {
		type: POSTING_LOAD_TEMP_LIST_FAILURE
	}
}

export function loadTempPostingItemRequest(postingId) {
	return (dispatch) => {
		dispatch(loadTempPostingItem());

		return axios.get(`/posting/load/temp/item/${postingId}`).then((response) => {
			dispatch(loadTempPostingItemSuccess(response.data));
		}).catch((error) => {
			dispatch(loadTempPostingItemFailure());
		});
	}
}

export function loadTempPostingItem() {
	return {
		type: POSTING_LOAD_TEMP_ITEM_REQUEST
	}
}

export function loadTempPostingItemSuccess(data) {
	return {
		type: POSTING_LOAD_TEMP_ITEM_SUCCESS,
		data
	}
}

export function loadTempPostingItemFailure() {
	return {
		type: POSTING_LOAD_TEMP_ITEM_FAILURE
	}
}

export function removePostingItemRequest(id) {
	return (dispatch) => {
		dispatch(removePostingItem());

		return axios.delete(`/posting/remove/${id}`).then((response) => {
			dispatch(removePostingItemSuccess());
		}).catch((error) => {
			dispatch(removePostingItemFailure(error.response.data.errorCode));
		});
	}
}

export function removePostingItem() {
	return {
		type: POSTING_REMOVE_ITEM_REQUEST
	}
}

export function removePostingItemSuccess() {
	return {
		type: POSTING_REMOVE_ITEM_SUCCESS
	}
}

export function removePostingItemFailure(errorCode) {
	return {
		type: POSTING_REMOVE_ITEM_FAILURE,
		errorCode
	}
}

export function modifyPostingItemRequest(postingId, data) {
	return (dispatch) => {
		dispatch(modifyPostingItem());

		return axios.put(`/posting/post/modify/${postingId}`, data).then((response) => {
			dispatch(modifyPostingItemSuccess());
		}).catch((error) => {
			dispatch(modifyPostingItemFailure());
		});
	}
}

export function modifyPostingItem() {
	return {
		type: POSTING_MODIFY_ITEM_REQUEST
	}
}

export function modifyPostingItemSuccess() {
	return {
		type: POSTING_MODIFY_ITEM_SUCCESS
	}
}

export function modifyPostingItemFailure() {
	return {
		type: POSTING_MODIFY_ITEM_FAILURE
	}
}