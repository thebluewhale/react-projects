import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Program extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='container program col s12 m12 l12'>
				<div className='card'>
					<div className='header'>
						{this.props.data.provider}
					</div>
					<div className='card-content'>
						{this.props.data.onair}
					</div>
				</div>
			</div>
		);
	}
}

Program.propTypes = {
	data: React.PropTypes.object,
	index: React.PropTypes.number,
};

Program.defaultProps = {
	data: {},
	index: -1
};

export default Program;
