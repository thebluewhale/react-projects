import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Account, Preloader } from '../components';
import { addNewUserRequest, loginRequest, checkTokenRequest } from '../actions/account';
import './App.css' ;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			preloader: false
		};
		this.handleAddNewUserRequest = this.handleAddNewUserRequest.bind(this);
		this.handleLoginRequest = this.handleLoginRequest.bind(this);
		this.clearSidenav = this.clearSidenav.bind(this);
	}

	handleAddNewUserRequest(username, password, email) {
		return this.props.addNewUserRequest(username, password, email).then(() => {
			if (this.props.addNewUser.status === 'SUCCESS') {
				window.M.toast({html: '회원가입에 성공했습니다.', inDuration: 2000});
				return true;
			} else {
				window.M.toast({html: '회원가입에 실패했습니다.', inDuration: 2000});
				return false;
			}
		});
	}

	handleLoginRequest(username, password) {
		return this.props.loginRequest(username, password).then(() => {
			if (this.props.login.status === 'SUCCESS') {
				window.M.toast({html: '로그인에 성공했습니다.', inDuration: 2000});
				document.cookie = 'access_token=' + this.props.session.access_token;
				return true;
			} else {
				window.M.toast({html: '로그인에 실패했습니다.', inDuration: 2000});
				return false;
			}
		});
	}

	clearSidenav() {
		let sidenav_elem = document.querySelector('.sidenav');
		let ins = window.M.Sidenav.getInstance(sidenav_elem);
		ins.close();
	}

	componentWillUnmount() {
		this.clearSidenav();
	}

	componentDidUpdate() {
		this.clearSidenav();
	}

	componentDidMount() {
		window.$('.sidenav').sidenav();
		const getCookie = (key) => {
			let value = ';' + document.cookie;
			let parts = value.split(';' + key + '=');
			if (parts.length == 2) {
				return parts.pop().split(';').shift();
			}
		}

		let access_token = getCookie('access_token');
		if (access_token) {
			this.setState({preloader: true});
			this.props.checkTokenRequest(access_token).then(() => {
				this.setState({preloader: false});
				if (!this.props.session.isLoggedIn) {
					document.cookie = '';
				}
			});
		}
	}

	render() {
		const moreMenu = (
			<div>
				<li><Link to='/' className='black-text'>Home</Link></li>
				{this.props.session.isLoggedIn ? 
					(<li><Link to='/markers' className='black-text'>Markers</Link></li>) : null}
				{this.props.session.isLoggedIn ? 
					(<li><Link to='/accounts' className='black-text'>Account</Link></li>) : null}
				<li><Link to='/aboutus' className='black-text'>About Us</Link></li>
			</div>
		);

		const header = (
			<nav className='nav-bg-image'>
				<div className='nav-wrapper'>
					<a href='/' className='brand-logo center brown-text darken-4'>My Marker</a>
					<a href='#' data-target='mobile-demo' className='sidenav-trigger'>
						<i className='material-icons'>menu</i>
					</a>
					<ul className='right hide-on-med-and-down'>
						{moreMenu}
					</ul>
				</div>
			</nav>
		);

		const sideNavi = (
			<ul className='sidenav' id='mobile-demo'>
				{moreMenu}
			</ul>
		);

		const accountDiv = (
			<Account addNewUserRequest={this.handleAddNewUserRequest}
					 loginRequest={this.handleLoginRequest}
					 history={this.props.history} />
		);

		return (
			<div>
				{header}
				{sideNavi}

				{this.state.preloader ? <Preloader /> : null}

				{this.props.session.isLoggedIn ? null : accountDiv}

				<div className='container center first-detail'>
					<h5>Welcome to 'My-Marker'</h5>
					<h6>You can mark whereever you want.</h6>
					<h6>You can make place plan with this.</h6>
				</div>
				<div className='container center second-detail'>
					<h5>this is second detail</h5>
					<h6>this is second description</h6>
				</div>
				<div className='container center third-detail'>
					<h5>this is third detail</h5>
					<h6>this is third description</h6>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.account.login,
		addNewUser: state.account.addNewUser,
		session: state.account.session
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addNewUserRequest: (username, password, email) => {
			return dispatch(addNewUserRequest(username, password, email));
		},
		loginRequest: (username, password) => {
			return dispatch(loginRequest(username, password));
		},
		checkTokenRequest: (access_token) => {
			return dispatch(checkTokenRequest(access_token));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
