import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav id='header'>
				<div className='nav-wrapper pink lighten-4'>
					<Link to='/' className='brand-logo center black-text logo'>지금 뭐하지?</Link>
				</div>
			</nav>
		);
	}
}

Header.propTypes = {
};

Header.defaultProps = {
};

export default Header;
