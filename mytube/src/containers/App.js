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
		return this.props.logoutRequest().then(() => {
			Materialize.toast('LOGOUT SUCCESS', 2000);
			let loginData = {
				isLoggedIn: false,
				username: ''
			};
			document.cookie = 'key=' + btoa(JSON.stringify(loginData));
			browserHistory.push('/');
		});
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
				if(!this.props.sessionStatus.valid) {
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
		let re = /(login|register)/;
		let isAuth = re.test(this.props.location.pathname);

		return (
			<div>
				{isAuth ? (undefined) :
						  (<Header isLoggedIn={this.props.sessionStatus.isLoggedIn}
							  	   onLogout={this.handleLogout}/>)}
				{this.props.children}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		sessionStatus: state.authentication.sessionStatus
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getStatusRequest: () => {
			return dispatch(getStatusRequest());
		},
		logoutRequest: () => {
			return dispatch(logoutRequest());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
