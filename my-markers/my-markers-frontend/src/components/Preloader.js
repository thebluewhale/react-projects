import React from 'react';
import { connect } from 'react-redux';
import './Preloader.css' ;

class Preloader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='preloader-background'>
				<div className='preloader-container center'>
					<div className="preloader-wrapper active">
						<div className="spinner-layer spinner-green-only">
							<div className="circle-clipper left">
								<div className="circle" />
							</div>
							<div className="gap-patch">
								<div className="circle" />
							</div>
							<div className="circle-clipper right">
								<div className="circle" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Preloader);
