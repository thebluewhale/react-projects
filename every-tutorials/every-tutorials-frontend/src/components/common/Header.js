import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css'

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogoutRequest = this.handleLogoutRequest.bind(this);
	}

	handleLogoutRequest() {
		this.props.handleLogoutRequest().then(() => {
			if (!this.props.session.isLoggedIn) {
				window.Materialize.toast('Logout success', 2000);
				this.props.history.replace('/');
			}
		});
	}

	componentDidMount() {
	}

	render() {
		const anonymouseButton = (
			<ul className='right-align'>
				<Link to='/account/signup'>
					SIGN UP
				</Link>
				<Link to='/account/login'>
					LOG IN
				</Link>
			</ul>
		);

		const userButton = (
			<ul className='right-align'>
				<Link to='/mypage'>
					MY PAGE
				</Link>
				<Link to='/write/new/new'>
					WRITE
				</Link>
				<a onClick={this.handleLogoutRequest}>
					LOG OUT
				</a>
			</ul>
		);

		return (
			<div className='navbar-fixed'>
				<nav className='header-bg-image'>
					<div className='nav-wrapper'>
						<div className='container'>
							<Link to='/' className='brand-logo'>Every Tutorials</Link>
							{this.props.session.isLoggedIn ? userButton : anonymouseButton}
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

Header.propTypes = {
	session: window.PropTypes.object,
	handleLogoutRequest: window.PropTypes.func,
	history: window.PropTypes.object
};

Header.defaultProps = {
	session: {
		valid: false,
		isLoggedIn: false,
		currentUser: ''
	},
	handleLogoutRequest: () => { console.log('handleLogoutRequest is not defined'); },
	history: {}
};

export default Header;
