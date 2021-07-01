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
		)

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

		const searchUserButton = (
			<ul>
				<li>
					<Link to='/search'>
						<i className='material-icons left'>search</i>
						SEARCH USER
					</Link>
				</li>
			</ul>
		)

		const rightHeaderButton = (this.props.isLoggedIn) ? (logoutButton) : (loginButton);
		const leftHeaderButton = (this.props.isLoggedIn) ? (searchUserButton) : (signinButton);
		return (
			<nav id='header'>
				<div className='nav-wrapper deep-purple darken-3'>
					<div className='left'>
						{leftHeaderButton}
					</div>
					<Link to='/' className='brand-logo center'>MYTUBE</Link>
					<div className='right'>
						<ul>
							{rightHeaderButton}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

Header.propTypes = {
	isLoggedIn: React.PropTypes.bool,
	currentUser: React.PropTypes.string,
	onLogout: React.PropTypes.func
};

Header.defaultProps = {
	isLoggedIn: false,
	currentUser: '',
	onLogout: () => { console.log('onLogout is not defined'); }
};

export default Header;
