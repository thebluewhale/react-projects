import {
	GET_POSTINGDATA_REQUEST, GET_POSTINGDATA_SUCCESS, GET_POSTINGDATA_FAILURE
} from './ActionTypes';

export function getPostingDataRequest(isInitial, lastId, keyword/*, filter*/) {
	return (dispatch) => {
		dispatch(getPostingData());

		let url = 'http://www.betterworkplace.net/getPostingData';
		if(keyword === undefined) {
			url = isInitial ? url : `${url}/${lastId}`;
		} else {
			/* filter is not supported now */
			let filter = 'nofilter';
			url = isInitial ? `${url}/search/${keyword}/${filter}` : `${url}/search/${keyword}/${filter}/${lastId}`;
		}

		return new Promise((resolve, reject) => {
			fetch(url)
			.then((response) => response.json())
			.then((responseJSON) => {
				if(responseJSON) {
					dispatch(getPostingDataSuccess(isInitial, responseJSON));
					resolve();
				} else {
					dispatch(getPostingDataFailure());
					resolve();
				}
			})
		})
	};
}

export function getPostingData() {
	return {
		type: GET_POSTINGDATA_REQUEST
	};
}

export function getPostingDataSuccess(isInitial, data) {
	return {
		type: GET_POSTINGDATA_SUCCESS,
		data: data,
		isInitial: isInitial
	};
}

export function getPostingDataFailure() {
	return {
		type: GET_POSTINGDATA_FAILURE
	};
}
