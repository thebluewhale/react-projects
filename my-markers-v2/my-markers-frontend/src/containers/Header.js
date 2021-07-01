import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AccountFormModal, Preloader } from '../components';
import { addNewUserRequest, loginRequest, logoutRequest } from '../actions/account';
import './Header.css' ;
import ErrorMessage from '../utils/ErrorMessage';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalMode: 'LOGIN',
			isModalOpen: false
		}
		this.sidenav_elem = null;
		this.sidenav_ins = null;
		this.modalInstance = null;
		this.setPreloaderState = this.setPreloaderState.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.showLoginModal = this.showLoginModal.bind(this);
		this.showSignInModal = this.showSignInModal.bind(this);
		this.showContactUsModal = this.showContactUsModal.bind(this);
		this.onModalClosed = this.onModalClosed.bind(this);
		this.handleAccountFormModalConfirmButton = this.handleAccountFormModalConfirmButton.bind(this);
	}
	
	setPreloaderState(state) {
		if (typeof state !== 'boolean') {
			state = false;
		}
		if (this.state.preloader === state) {
			let _this = this;
			setTimeout(() => {
				_this.setState({preloader: state});
			}, 2000);
		}
		this.setState({preloader: state});
	}

	onModalClosed() {
		this.setState({isModalOpen: false});
	}

	showContactUsModal() {
		this.setState({modalMode: 'CONTACTUS', isModalOpen: true});
	}

	showLoginModal() {
		this.setState({modalMode: 'LOGIN', isModalOpen: true});
	}

	showSignInModal() {
		this.setState({modalMode: 'SIGNIN', isModalOpen: true});
	}

	handleAccountFormModalConfirmButton(mode, username, password, email) {
		this.setPreloaderState(true);
		if (mode === 'LOGIN') {
			return this.props.loginRequest(username, password).then(() => {
				this.setPreloaderState(false);
				if (this.props.login.status === 'SUCCESS') {
					window.M.toast({html: '로그인에 성공했습니다.', classes: 'styled-font', displayLength: 2000});
					document.cookie = 'access_token=' + this.props.session.access_token;
					return true;
				} else {
					let errorMsg = ErrorMessage.getLoginErrorMessage(this.props.login.errorCode);
					window.M.toast({html: errorMsg, classes: 'styled-font', displayLength: 2000});
					return false;
				}
			});
		} else {
			return this.props.addNewUserRequest(username, password, email).then(() => {
				this.setPreloaderState(false);
				if (this.props.addNewUser.status === 'SUCCESS') {
					window.M.toast({html: '회원가입에 성공했습니다.', classes: 'styled-font', displayLength: 2000});
					this.props.history.replace('/');
					return true;
				} else {
					let errorMsg = ErrorMessage.getSignInErrorMessage(this.props.addNewUser.errorCode);
					window.M.toast({html: errorMsg, classes: 'styled-font', displayLength: 2000});
					return false;
				}
			});
		}
	}

	handleLogout() {
		this.props.logoutRequest().then(() => {
			window.M.toast({html: '로그아웃 되었습니다.', classes: 'styled-font', displayLength: 2000});
			this.props.history.replace('/');
		});
	}

	componentWillUnmount() {
		this.sidenav_ins.close();
	}

	componentDidUpdate() {
		this.sidenav_ins.close();
	}

	componentDidMount() {
		window.$('.sidenav').sidenav();
		this.sidenav_elem = document.querySelector('.sidenav');
		this.sidenav_ins = window.M.Sidenav.getInstance(this.sidenav_elem);
	}

	render() {
		const moreMenu = (
			<div>
				<li><Link to='/' className='indigo-text text-darken-4'>메인페이지</Link></li>
				{this.props.session.isLoggedIn ? 
					(<li><Link to='/markers' className='indigo-text text-darken-4'>마커관리</Link></li>) : null}
				{this.props.session.isLoggedIn ? 
					(<li><Link to='/myinfo' className='indigo-text text-darken-4'>계정관리</Link></li>) : null}
				{this.props.session.isLoggedIn ?
					null : (<li><a className='indigo-text text-darken-4' onClick={this.showLoginModal}>로그인</a></li>)}
				{this.props.session.isLoggedIn ?
					null : (<li><a className='indigo-text text-darken-4' onClick={this.showSignInModal}>회원가입</a></li>)}
				{this.props.session.isLoggedIn ? 
					(<li><a className='indigo-text text-darken-4' onClick={this.handleLogout}>로그아웃</a></li>) : null}
				{this.props.session.isLoggedIn ?
					null : (<li><a className='indigo-text text-darken-4' onClick={this.showContactUsModal}>About Us</a></li>)}
			</div>
		);

		const header = (
			<nav className='transparent'>
				<div className='nav-wrapper'>
					<a href='/' className='brand-logo center indigo-text text-darken-4 styled-font'>
						<i className='material-icons hide-on-med-and-down'>donut_large</i>
						My Marker
					</a>
					<a data-target='mobile-demo' className='sidenav-trigger'>
						<i className='material-icons indigo-text text-darken-4'>menu</i>
					</a>
					<ul className='right hide-on-med-and-down'>
						{moreMenu}
					</ul>
				</div>
			</nav>
		);

		const sideNavi = (
			<ul className='sidenav indigo lighten-5' id='mobile-demo'>
				{moreMenu}
			</ul>
		);

		return (
			<div>
				{this.state.preloader ? <Preloader /> : null}
				{header}
				{sideNavi}
				<AccountFormModal history={this.props.history}
								  modalMode={this.state.modalMode}
								  isModalOpen={this.state.isModalOpen}
								  onModalClosed={this.onModalClosed}
								  handleAccountFormModalConfirmButton={this.handleAccountFormModalConfirmButton}>
				</AccountFormModal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		session: state.account.session,
		login: state.account.login,
		addNewUser: state.account.addNewUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logoutRequest: () => {
			return dispatch(logoutRequest());
		},
		addNewUserRequest: (username, password, email) => {
			return dispatch(addNewUserRequest(username, password, email));
		},
		loginRequest: (username, password) => {
			return dispatch(loginRequest(username, password));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
