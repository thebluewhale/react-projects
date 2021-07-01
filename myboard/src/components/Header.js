import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const loginButton = (
			<li>
				<Link to='/login'>
					<i className='material-icons left'>lock_open</i>
					LOGIN
				</Link>
			</li>
		);

		const logoutButton = (
			<li>
				<a onClick={this.props.onLogout}>
					<i className='material-icons left'>lock</i>
					LOGOUT
				</a>
			</li>
		);

		const signinButton = (
			<ul>
				<li>
					<Link to='/register'>
						<i className='material-icons left'>assignment</i>
						SIGNIN
					</Link>
				</li>
			</ul>
		)

		const myInfoButton = (
			<ul>
			    <li>
					<Link to={'/myinfo/view'}>
						<i className='material-icons left'>perm_identity</i>
					</Link>
				</li>
				<li>
					<Link to={'/message/read/' + this.props.currentUser}>
						<i className='material-icons left'>message</i>
					</Link>
				</li>
			</ul>
		);

		let whichButton = (this.props.isLoggedIn) ? (logoutButton) : (loginButton);
		let rightButtonView = (this.props.isAuthPage) ? (undefined) : (whichButton);
		let leftButtonView = (this.props.isLoggedIn) ? (myInfoButton) : (signinButton);

		return (
			<nav>
				<div className='nav-wrapper deep-purple darken-3'>
					<div className='left'>
						{leftButtonView}
					</div>
					<Link to='/' className='brand-logo center'>MY BOARD</Link>
					<div className='right'>
						<ul>
							{rightButtonView}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.authentication.status.currentUser
	};
};

const mapDispatchToProps = (dispatch) => {
	return {}
};

Header.propTypes = {
	isLoggedIn: React.PropTypes.bool,
	isAuthPage: React.PropTypes.bool,
	onLogout: React.PropTypes.func
};

Header.defaultProps = {
	isLoggedIn: false,
	isAuthPage: false,
	onLogout: () => { console.log("onLogout is not defined"); }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
