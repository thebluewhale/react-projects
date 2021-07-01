import {
	GET_TIMETABLE_DATA_REQUEST, GET_TIMETABLE_DATA_SUCCESS, GET_TIMETABLE_DATA_FAILURE,
	SEARCH_TIMETABLE_DATA_REQUEST, SEARCH_TIMETABLE_DATA_SUCCESS, SEARCH_TIMETABLE_DATA_FAILURE,
	CLEAR_TIMETABLE_DATA
} from './ActionTypes';
import axios from 'axios';

export function getTimetableDataRequest(isInitial, lastObjId, channel, category) {
	return (dispatch) => {
		dispatch(getTimetableData());

		let url = '/getTimetableData';
		if (!channel && !category) {
			url = isInitial ? url : `${url}/${lastObjId}`;
		} else {
			channel = channel ? channel : '전체';
			category = category ? category : '전체';
			let query = `channel=${channel}&category=${category}`;
			url = isInitial ? `${url}/filter/${query}` : `${url}/filter/${query}/${lastObjId}`;
		}

		return axios.get(url).then((response) => {
			dispatch(getTimetableDataSuccess(isInitial, response.data));
		}).catch((error) => {
			dispatch(getTimetableDataFailure());
		});
	};
}

export function getTimetableData() {
	return {
		type: GET_TIMETABLE_DATA_REQUEST
	};
}

export function getTimetableDataSuccess(isInitial, data) {
	return {
		type: GET_TIMETABLE_DATA_SUCCESS,
		isInitial: isInitial,
		data: data
	};
}

export function getTimetableDataFailure() {
	return {
		type: GET_TIMETABLE_DATA_FAILURE
	};
}

export function searchTimetableDataRequest(keyword) {
	return (dispatch) => {
		dispatch(searchTimetableData());

		let url = `getTimetableData/search/${keyword}`;
		return axios.get(url).then((response) => {
			dispatch(searchTimetableDataSuccess(response.data));
		}).catch((error) => {
			dispatch(searchTimetableDataFailure());
		});
	};
}

export function searchTimetableData() {
	return {
		type: SEARCH_TIMETABLE_DATA_REQUEST
	}
}

export function searchTimetableDataSuccess(data) {
	return {
		type: SEARCH_TIMETABLE_DATA_SUCCESS,
		data: data
	}
}

export function searchTimetableDataFailure() {
	return {
		type: SEARCH_TIMETABLE_DATA_FAILURE
	}
}

export function clearTimetableDataRequest() {
	return (dispatch) => {
		dispatch(clearTimetableData());
	}
}

export function clearTimetableData() {
	return {
		type: CLEAR_TIMETABLE_DATA
	}
}
