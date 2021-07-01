import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch() {

	}

	render() {
		const searchButton = (
			<ul>
				<li>
					<Link to='/search'>
						<i className='material-icons right'
						   onClick={this.handleSearch}>search</i>
					</Link>
				</li>
			</ul>
		);

		const infoButton = (
			<ul>
				<li>
					<Link to='/help'>
						<i className='material-icons tiny-icon'>info_outline</i>
					</Link>
				</li>
			</ul>
		);

		return (
			<div className='navbar-fixed'>
				<nav>
					<div className='nav-wrapper pink lighten-2 logo'>
						<div className='left'>
							{infoButton}
						</div>
						<a href='/'>Better Workplace</a>
						<div className='right'>
							{searchButton}
						</div>
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
