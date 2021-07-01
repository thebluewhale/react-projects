import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Filter.css';
import Configs from '../../utils/Configs';

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filters: Configs.getCategory()
		};
		this.goToCategoryView = this.goToCategoryView.bind(this);
	}

	goToCategoryView(category) {
		if (category === 'all') {
			this.props.history.push('/');
		} else {
			let encodedCategory = encodeURIComponent(category);
			let categoryViewUrl = `/categoryview/${encodedCategory}`;
			this.props.history.push(categoryViewUrl);
		}
	}

	render() {
		const populateFilterButton = (filters) => {
			return filters.map((filter, i) => {
				return (
					<div className='filter-container col l3 m6 s6' key={i}
						 onClick={() => {this.goToCategoryView(filters[i]);}}>
						<div className='card filter-border blue-grey darken-4'>
							<div className='card-content white-text center'>
								<b>{filters[i]}</b>
							</div>
						</div>
					</div>
				);
			});
		};

		const allFilter = (
			<div className='filter-container col l3 m6 s6' key={99}
				 onClick={() => {this.goToCategoryView('all');}}>
				<div className='card filter-border blue-grey darken-4'>
					<div className='card-content white-text center'>
						<b>ALL CONTENTS</b>
					</div>
				</div>
			</div>
		);

		return (
			<div className='containter'>
				<div className='filter-padding'>
					<div className='row'>
						{allFilter}
						{populateFilterButton(this.state.filters)}
					</div>
				</div>
			</div>
		);
	}
}

Filter.propTypes = {
	history: window.PropTypes.object
};

Filter.defaultProps = {
	history: {}
};

export default Filter;
