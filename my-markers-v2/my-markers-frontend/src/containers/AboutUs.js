import React from 'react';
import { connect } from 'react-redux';
import './AboutUs.css' ;

class AboutUs extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const aboutUsGuide = (
			<div className='container'>
				<div className='card-panel transparent'>
					<h5 className='styled-font'>
						www.mymarker.site
						<br/>
						현재 베타서비스중입니다.
						<br/>
						건의/문의사항은
						<br/>
						struct.st.x@gmail.com
						<br/>
						메일보내주세요.
						<br/>
						감사합니다.
					</h5>
				</div>
			</div>
		);

		return (
			<div>
				{aboutUsGuide}
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
