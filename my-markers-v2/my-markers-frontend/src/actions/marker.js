import {
	MARKER_ADDNEWMARKER_REQUEST, MARKER_ADDNEWMARKER_SUCCESS, MARKER_ADDNEWMARKER_FAILURE,
	MARKER_GETALLMARKERS_REQUEST, MARKER_GETALLMARKERS_SUCCESS, MARKER_GETALLMARKERS_FAILURE,
	MARKER_UPDATEMARKER_REQUEST, MARKER_UPDATEMARKER_SUCCESS, MARKER_UPDATEMARKER_FAILURE,
	MARKER_DELETEMARKER_REQUEST, MARKER_DELETEMARKER_SUCCESS, MARKER_DELETEMARKER_FAILURE,
	MARKER_GETMARKERS_BYKEYWORD_REQUEST, MARKER_GETMARKERS_BYKEYWORD_SUCCESS, MARKER_GETMARKERS_BYKEYWORD_FAILURE,
	MARKER_DELETEALLMARKER_REQUEST, MARKER_DELETEALLMARKER_SUCCESS, MARKER_DELETEALLMARKER_FAILURE
} from './ActionTypes';
import axios from 'axios';

//const DEFAULT_URL = 'https://jtpiu9tu6b.execute-api.ap-northeast-2.amazonaws.com/dev/';
const DEFAULT_URL = '/api';

export function addNewMarkerRequest(data) {
	return (dispatch) => {
		dispatch(addNewMarker());

		let fullURL = DEFAULT_URL + '/marker/addnewmarker';
		return axios.post(fullURL, {data}).then((response) => {
			dispatch(addNewMarkerSuccess());
		}).catch((error) => {
			dispatch(addNewMarkerFailure());
		});
	}
}

export function addNewMarker() {
	return {
		type: MARKER_ADDNEWMARKER_REQUEST
	}
}

export function addNewMarkerSuccess() {
	return {
		type: MARKER_ADDNEWMARKER_SUCCESS
	}
}

export function addNewMarkerFailure() {
	return {
		type: MARKER_ADDNEWMARKER_FAILURE
	}
}

export function getAllMarkersRequest(username) {
	return (dispatch) => {
		dispatch(getAllMarkers());

		let fullURL = DEFAULT_URL + `/marker/getallmarkers`;
		return axios.get(fullURL).then((response) => {
			dispatch(getAllMarkersSuccess(response.data.markers));
		}).catch((error) => {
			dispatch(getAllMarkersFailure());
		});
	}
}

export function getAllMarkers() {
	return {
		type: MARKER_GETALLMARKERS_REQUEST
	}
}

export function getAllMarkersSuccess(markers) {
	return {
		type: MARKER_GETALLMARKERS_SUCCESS,
		markers
	}
}

export function getAllMarkersFailure() {
	return {
		type: MARKER_GETALLMARKERS_FAILURE
	}
}

export function updateMarkerRequest(id, updateData) {
	return (dispatch) => {
		dispatch(updateMarker());

		let fullURL = DEFAULT_URL + `/marker/updatemarker/${id}`;
		return axios.patch(fullURL, {updateData}).then((response) => {
			dispatch(updateMarkerSuccess(response.data));
		}).catch((error) => {
			dispatch(updateMarkerFailure());
		});
	}
}

export function updateMarker() {
	return {
		type: MARKER_UPDATEMARKER_REQUEST
	}
}

export function updateMarkerSuccess() {
	return {
		type: MARKER_UPDATEMARKER_SUCCESS
	}
}

export function updateMarkerFailure() {
	return {
		type: MARKER_UPDATEMARKER_FAILURE
	}
}

export function deleteMarkerRequest(id) {
	return (dispatch) => {
		dispatch(deleteMarker());

		let fullURL = DEFAULT_URL + `/marker/deletemarker/${id}`;
		return axios.delete(fullURL).then((response) => {
			dispatch(deleteMarkerSuccess());
		}).catch((error) => {
			dispatch(deleteMarkerFailure());
		});
	}
}

export function deleteMarker() {
	return {
		type: MARKER_DELETEMARKER_REQUEST
	}
}

export function deleteMarkerSuccess() {
	return {
		type: MARKER_DELETEMARKER_SUCCESS
	}
}

export function deleteMarkerFailure() {
	return {
		type: MARKER_DELETEMARKER_FAILURE
	}
}

export function getMarkersByKeywordRequest(keyword) {
	return (dispatch) => {
		dispatch(getMarkersByKeyword());

		let paramQuery = `?keyword=${keyword}`
		let fullURL = DEFAULT_URL + `/marker/getmarkers/bykeyword${paramQuery}`;
		return axios.get(fullURL).then((response) => {
			dispatch(getMarkersByKeywordSuccess(response.data.markers));
		}).catch((error) => {
			dispatch(getMarkersByKeywordFailure());
		});
	}
}

export function getMarkersByKeyword() {
	return {
		type: MARKER_GETMARKERS_BYKEYWORD_REQUEST
	}
}

export function getMarkersByKeywordSuccess(markers) {
	return {
		type: MARKER_GETMARKERS_BYKEYWORD_SUCCESS,
		markers
	}
}

export function getMarkersByKeywordFailure() {
	return {
		type: MARKER_GETMARKERS_BYKEYWORD_FAILURE
	}
}

export function deleteAllMarkerRequest() {
	return (dispatch) => {
		dispatch(deleteAllMarker());

		let fullURL = DEFAULT_URL + '/marker/deleteallmarker';
		return axios.delete(fullURL).then((response) => {
			dispatch(deleteAllMarkerSuccess());
		}).catch((error) => {
			dispatch(deleteAllMarkerFailure());
		});
	}
}

export function deleteAllMarker() {
	return {
		type: MARKER_DELETEALLMARKER_REQUEST
	}
}

export function deleteAllMarkerSuccess() {
	return {
		type: MARKER_DELETEALLMARKER_SUCCESS
	}
}

export function deleteAllMarkerFailure() {
	return {
		type: MARKER_DELETEALLMARKER_FAILURE
	}
}