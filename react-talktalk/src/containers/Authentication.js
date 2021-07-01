import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Login, Register} from 'components';
import {registerRequest, loginRequest} from '../actions/authentication';

class Authentication extends React.Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleRegister(username, password, email) {
		return this.props.registerRequest(username, password, email).then(
			() => {
				if(this.props.registerStatus === 'SUCCESS') {
					Materialize.toast('REGISTER SUCCESS', 2000);
					browserHistory.push('/authentication/login');
					return true;
				} else {
					let errMsg = [
						'BAD USERNAME', 'BAD PASSWORD',
						'BAD EMAIL', 'USERNAME ALREADY EXIST'
					];
					Materialize.toast(errMsg[this.props.registerErrorCode - 1], 2000);
					return false;
				}
			}
		);
	}

	handleLogin(username, password) {
		return this.props.loginRequest(username, password).then(
			() => {
				if(this.props.loginStatus === 'SUCCESS') {
					let loginData = {
						isLoggedIn: true,
						username: username
					};
					document.cookie = 'key=' + btoa(JSON.stringify(loginData));
					Materialize.toast('LOGIN SUCCESS', 2000);
					browserHistory.push('/chat/' + username);
					return true;
				} else {
					let errMsg = [
						'INVALID USERNAME',
						'USERNAME NOT EXIST',
						'INVALID PASSWORD'
					];
					Materialize.toast(errMsg[this.props.loginErrorCode - 1], 2000);
					return false;
				}
			}
		);
	}

	render() {
		const loginView = (
			<div className='container auth'>
				<div className='card'>
					<div className='header deep-purple white-text center'>
						<div className='card-content'>LOG IN</div>
					</div>
					<Login onLogin={this.handleLogin}/>
				</div>
			</div>
		)

		const registerView = (
			<div className='container auth'>
				<div className='card'>
					<div className='header deep-purple white-text center'>
						<div className='card-content'>REGISTER</div>
					</div>
					<Register onRegister={this.handleRegister}/>
				</div>
			</div>
		)

		const authenticationView =
			(this.props.params.mode === 'register') ? (registerView) : (loginView);

		return (
			<div>
				{authenticationView}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		registerStatus: state.authentication.register.status,
		registerErrorCode: state.authentication.register.error,
		loginStatus: state.authentication.login.status,
		loginErrorCode: state.authentication.login.error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerRequest: (username, password, email) => {
			return dispatch(registerRequest(username, password, email));
		},
		loginRequest: (username, password) => {
			return dispatch(loginRequest(username, password));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
