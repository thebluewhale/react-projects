import React from 'react';
import { Header } from '../components';
import { connect } from 'react-redux';
import './AccountConfirm.css' ;
import { signupConfirmRequest } from '../actions/account';

class AccountConfirm extends React.Component {
	constructor(props) {
		super(props);
		this.signupConfirmRequest = this.signupConfirmRequest.bind(this);
	}

	signupConfirmRequest(username, hashvalue) {
		this.props.signupConfirmRequest(username, hashvalue).then(() => {
			if (this.props.signupConfirm.status === 'SUCCESS') {
				this.props.history.replace('/account/login');
			}
		});
	}

	componentDidMount() {
		let username = this.props.match.params.username;
		let hashvalue = this.props.match.params.hashvalue;
		this.signupConfirmRequest(username, hashvalue);
	}

	render() {
		return (
			<div>
				<Header/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		signupConfirm: state.account.signupConfirm
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signupConfirmRequest: (username, hashvalue) => {
			return dispatch(signupConfirmRequest(username, hashvalue));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountConfirm);
