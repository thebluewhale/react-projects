import React from 'react';
import {Authentication} from 'components';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {loginRequest} from '../actions/authentication';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(username, password) {
		return this.props.loginRequest(username, password).then(() => {
			if(this.props.loginStatus === 'SUCCESS') {
				let loginData = {
					isLoggedIn: true,
					username: username
				};
				document.cookie = 'key=' + btoa(JSON.stringify(loginData));
				Materialize.toast('LOGIN SUCCESS', 2000);
				browserHistory.push('/');
				return true;
			} else {
				let errMsg = [
					'INVALID PASSWORD', 'ID NOT EXIST', 'WRONG PASSWORD'
				];
				Materialize.toast(errMsg[this.props.loginErrorCode - 1], 2000);
				return false;
			}
		});
	}

	render() {
		return (
			<div>
				<Authentication mode={'login'} onLogin={this.handleLogin}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loginStatus: state.authentication.login.status,
		loginErrorCode: state.authentication.login.errorCode
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginRequest: (username, password) => {
			return dispatch(loginRequest(username, password));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
