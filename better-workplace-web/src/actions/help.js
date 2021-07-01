import {
	HELP_POSTINGVOC_REQUEST, HELP_POSTINGVOC_SUCCESS, HELP_POSTINGVOC_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function vocPostingRequest(vocContents) {
	return (dispatch) => {
		dispatch(vocPosting());

		return axios.post('/help/vocposting',{vocContents}).then((response) => {
			dispatch(vocPostingSuccess());
		}).catch((error) => {
			dispatch(vocPostingFailure());
		});
	};
}

export function vocPosting() {
	return {
		type: HELP_POSTINGVOC_REQUEST
	};
}

export function vocPostingSuccess() {
	return {
		type: HELP_POSTINGVOC_SUCCESS
	};
}

export function vocPostingFailure() {
	return {
		type: HELP_POSTINGVOC_FAILURE
	};
}
