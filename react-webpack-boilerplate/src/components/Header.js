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
				<div className='nav-wrapper deep-purple darken-3'>
					<Link to='/' className='brand-logo center'>REACT BOILERPLATE</Link>
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
