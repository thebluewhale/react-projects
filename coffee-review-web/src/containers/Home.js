import React from 'react';
import {connect} from 'react-redux';
import {Company} from 'components';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.companies = [
			'starbucks', 'coffeebean', 'twosomeplace', 'hollys', 'ediya',
			'pascucci', 'cafebene', 'angelinus', 'tomntoms', 'paulbassett'
		];
	}

	render() {
		const mapToComponents = (data) => {
			return data.map((company, i) => {
				return (
					<Company key={i} companyName={company}/>
				);
			});
		}

		return (
			<div className='wrapper'>
				<div className='container row'>
					{mapToComponents(this.companies)}
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
