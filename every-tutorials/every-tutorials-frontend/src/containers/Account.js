import React from 'react';
import { Header, AccountForm } from '../components';
import { connect } from 'react-redux';
import './Account.css' ;
import { loginRequest, signupRequest } from '../actions/account';

class Account extends React.Component {
	constructor(props) {
		super(props);
		this.loginRequest = this.loginRequest.bind(this);
		this.signupRequest = this.signupRequest.bind(this);
	}

	loginRequest(username, password) {
		return this.props.loginRequest(username, password);
	}

	signupRequest(username, password, email) {
		return this.props.signupRequest(username, password, email);
	}

	render() {
		const accountForm = (
			<AccountForm requestType={this.props.match.params.requestType}
			 			 loginRequest={this.loginRequest}
						 signupRequest={this.signupRequest}
						 login={this.props.login}
						 signup={this.props.signup}
						 history={this.props.history} />
		);

		return (
			<div>
				<Header/>
				{accountForm}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.account.login,
		signup: state.account.signup
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginRequest: (username, password) => {
			return dispatch(loginRequest(username, password));
		},
		signupRequest: (username, password, email) => {
			return dispatch(signupRequest(username, password, email));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
