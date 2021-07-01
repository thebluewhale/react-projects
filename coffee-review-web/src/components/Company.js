import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Company extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className='container col s3 m3 l3'>
				<div className='card'>
					{this.props.companyName}
				</div>
			</div>
		);
	}
}

Company.propTypes = {
};

Company.defaultProps = {
};

export default Company;
