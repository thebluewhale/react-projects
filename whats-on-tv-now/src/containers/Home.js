import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div className='container list-container'>
				<div className='row'>
					<Link to='/list/full' className='col s12 m12 l12'>
						<div className='card-panel center main-button pink lighten-5 black-text'>
							전체 보기
						</div>
					</Link>
					<Link to='/filter' className='col s12 m12 l12'>
						<div className='card-panel center main-button pink lighten-5 black-text'>
							카테고리별 보기
						</div>
					</Link>
					<Link to='/search' className='col s12 m12 l12'>
						<div className='card-panel center main-button pink lighten-5 black-text'>
							검색
						</div>
					</Link>
				</div>
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
