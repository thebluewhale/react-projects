import React from 'react';
import {SearchResult} from 'components';
import {connect} from 'react-redux';
import {searchUserRequest} from '../actions/authentication';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(keyword) {
		return this.props.searchUserRequest(keyword).then(
			() => {
				if(this.props.searchUserStatus === 'SUCCESS') {
					return true;
				} else {
					Materialize.toast('ERROR OCCURED ON SERVER', 2000);
					return false;
				}
			}
		);
	}

	render() {
		return (
			<div className='container search'>
				<div className='card'>
					<div className='header deep-purple white-text center'>
						<div className='card-content'>SEARCH USER</div>
					</div>
					<SearchResult onSearch={this.handleSearch}
								  resultDatas={this.props.searchUserResult}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		searchUserStatus: state.authentication.searchUser.status,
		searchUserResult: state.authentication.searchUser.results,
		searchUserErrorCode: state.authentication.searchUser.error
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
