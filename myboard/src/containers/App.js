import React from 'react';
import {Header} from 'components';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {getStatusRequest, logoutRequest} from '../actions/authentication';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout() {
		this.props.logoutRequest().then(
			() => {
				Materialize.toast('Logout Success', 2000);

				let loginData = {
					isLoggedIn: false,
					username: ''
				};

				document.cookie = 'key=' + btoa(JSON.stringify(loginData));
				browserHistory.push('/home');
			}
		);
	}

	componentDidMount() {
		function getCookie(name) {
			var value = '; ' + document.cookie;
			var parts = value.split('; ' + name + '=');
			if(parts.length == 2) {
				return parts.pop().split(';').shift();
			}
		}

		let loginData = getCookie('key');
		if(typeof loginData === 'undefined') return;

		loginData = JSON.parse(atob(loginData));
		if(!loginData.isLoggedIn) return;
		this.props.getStatusRequest().then(
			() => {
				if(!this.props.status.valid) {
					loginData = {
						isLoggedIn: false,
						username: ''
					};

					document.cookie = 'key=' + btoa(JSON.stringify(loginData));
					Materialize.toast('Your session is expired. Login again', 2000);
				}
			}
		);
	}

	render() {
		let re = /(login|register)/;
		let isAuth = re.test(this.props.location.pathname);

		return (
			<div>
				{isAuth ? (undefined) : (<Header isLoggedIn={this.props.status.isLoggedIn} onLogout={this.handleLogout}/>)}
				{this.props.children}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		status: state.authentication.status
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
