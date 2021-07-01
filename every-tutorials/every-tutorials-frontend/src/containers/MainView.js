import React from 'react';
import { connect } from 'react-redux';
import { Filter, Postings } from '../components';
import './MainView.css';
import { loadAllPostingsRequest, loadPostingsByCategoryRequest } from '../actions/posting';

class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.readPostingItem = this.readPostingItem.bind(this);
	}

	readPostingItem(postingId) {
		this.props.history.push(`/read/${postingId}`);
	}

	componentDidMount() {
		if (this.props.match.params.category === undefined) {
			this.props.loadAllPostingsRequest();
		} else {
			let category = this.props.match.params.category;
			this.props.loadPostingsByCategoryRequest(category);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.category != this.props.match.params.category) {
			let encodedCategory = this.props.match.params.category;
			this.props.loadPostingsByCategoryRequest(encodedCategory);
		}
	}

	render() {
		return (
			<div className='container'>
				<Filter history={this.props.history} />
				<Postings postingData={this.props.postingList.data}
						  handleReadPostingItem={this.readPostingItem} />
			</div>
		);
	}
}

MainView.propTypes = {
	match: window.PropTypes.object
};

MainView.defaultProps = {
	match: {}
};

const mapStateToProps = (state) => {
	return {
		postingList: state.posting.postingList
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadAllPostingsRequest: () => {
			return dispatch(loadAllPostingsRequest());
		},
		loadPostingsByCategoryRequest: (category) => {
			return dispatch(loadPostingsByCategoryRequest(category));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
