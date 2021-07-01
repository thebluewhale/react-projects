import {
	ACTION
} from './ActionTypes';
import axios from 'axios';

export function requestAction() {
	return (dispatch) => {
		return axios.post('url', {datas}).then((response) => {
			dispatch(successAction());
		}).catch((error) => {
			dispatch(failureAction());
		});
	}
}

export function successAction() {
	return {
		type: ACTION;
	};
}
