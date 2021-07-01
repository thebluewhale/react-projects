import React from 'react';
import {connect} from 'react-redux';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div>
				THIS IS HOME Component
			</div>
		);
	}
}

Home.propTypes = {
};

Home.defaultProps = {
};


const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
