import React from 'react';
import {Authentication} from 'components';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {registerRequest} from '../actions/authentication';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleRegister(username, password, email) {
		return this.props.registerRequest(username, password, email).then(() => {
			if(this.props.registerStatus === 'SUCCESS') {
				Materialize.toast('REGISTER SUCCESS', 2000);
				browserHistory.push('/login');
				return true;
			} else {
				let errMsg = [
					'BAD USERNAME', 'BAD PASSWORD',
					'BAD EMAIL', 'USERNAME ALREADY EXIST'
				];
				Materialize.toast(errMsg[this.props.registerErrorCode - 1], 2000);
				return false;
			}
		});
	}

	render() {
		return (
			<div>
				<Authentication mode={'register'} onRegister={this.handleRegister}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		registerStatus: state.authentication.register.status,
		registerErrorCode: state.authentication.register.errorCode
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerRequest: (username, password, email) => {
			return dispatch(registerRequest(username, password, email));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
