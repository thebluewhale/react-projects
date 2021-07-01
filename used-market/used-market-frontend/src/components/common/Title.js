import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Title.css'

class Title extends React.Component {
	constructor(props) {
		super(props);
		this.logoutRequest = this.logoutRequest.bind(this);
		this.goBackPage = this.goBackPage.bind(this);
	}

	goBackPage() {
		this.props.history.goBack();
	}

	logoutRequest() {
		console.log('logout');
	}

	componentDidMount() {
		window.$('.dropdown-button').dropdown({
			constrainWidth: false,
			belowOrigin: true,
			stopPropagation: true
		});
	}

	render() {
		return (
			<div className='navbar-fixed'>
				<nav className='title-bg-image'>
					<div className='nav-wrapper'>
						<ul className='left'>
							<li onClick={this.goBackPage}>
								<a><i className='material-icons'>navigate_before</i></a>
							</li>
							<li>
								<div className='brand-logo'>
									{this.props.title}
								</div>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

Title.propTypes = {
	title: window.PropTypes.string,
	history: window.PropTypes.object
};

Title.defaultProps = {
	title: '',
	history: {}
};

export default Title;
