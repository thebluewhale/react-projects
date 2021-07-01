import React from 'react';
import {connect} from 'react-redux';
import {SearchPage} from 'components';
import {searchUserRequest} from '../actions/search';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(keyword) {
		return this.props.searchUserRequest(keyword).then(() => {
			if(this.props.searchUserStatus === 'SUCCESS') {
				return true;
			} else {
				Materialize.toast('ERROR OCCURED ON SERVER', 2000);
				return false;
			}
		});
	}

	render() {
		return (
			<div>
				<SearchPage onSearch={this.handleSearch}
							searchUserData={this.props.searchUserData}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		searchUserStatus: state.search.searchUser.status,
		searchUserErrorCode: state.search.searchUser.errorCode,
		searchUserData: state.search.searchUser.data
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchUserRequest: (keyword) => {
			return dispatch(searchUserRequest(keyword));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
