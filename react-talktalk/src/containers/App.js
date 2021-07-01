import React from 'react';
import {Header} from 'components';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {logoutRequest, getStatusRequest} from '../actions/authentication';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout() {
		this.props.logoutRequest().then(
			() => {
				Materialize.toast('LOGOUT SUCCESS', 2000);
				let userData = {
					isLoggedIn: false,
					username: ''
				};
				document.cookie = 'key=' + btoa(JSON.stringify(userData));
				browserHistory.push('/');
			}
		);
	}

	componentDidMount() {
		function getCookie(name) {
			let value = '; ' + document.cookie;
			let parts = value.split('; ' + name + '=');
			if(parts.length == 2) {
				return parts.pop().split(';').shift();
			}
		}
		let loginData = getCookie('key');
		if(typeof loginData === 'undefined') {
			return;
		} else {
			this.props.getStatusRequest().then(() => {
				if(!this.props.valid) {
					loginData = {
						isLoggedIn: false,
						username: ''
					};
					document.cookie = 'key=' + btoa(JSON.stringify(loginData));
					Materialize.toast('SESSION EXPIRED', 2000);
				}
			});
		}
	}

	render() {
		return (
			<div>
				<Header isLoggedIn={this.props.isLoggedIn}
						currentUser={this.props.currentUser}
						onLogout={this.handleLogout}/>
				{this.props.children}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.authentication.status.isLoggedIn,
		currentUser: state.authentication.status.currentUser,
		valid: state.authentication.status.valid
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logoutRequest: () => {
			return dispatch(logoutRequest());
		},
		getStatusRequest: () => {
			return dispatch(getStatusRequest());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
