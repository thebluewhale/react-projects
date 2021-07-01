import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='navbar-fixed'>
				<nav>
					<div className='nav-wrapper brown logo'>
						<Link to='/'>Coffee Review</Link>
					</div>
				</nav>
			</div>
		);
	}
}

Header.propTypes = {
};

Header.defaultProps = {
};

export default Header;
