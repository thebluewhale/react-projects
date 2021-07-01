import React from 'react';
import {connect} from 'react-redux';
import {PostingList} from 'components';
import {Search} from 'components';
import {getPostingDataRequest} from '../actions/getPostingData';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scrollButtonState: false,
			loadingState: false,
			mode: 'all',
			keyword: ''
		};
		this.scrollTop = this.scrollTop.bind(this);
		this.loadMorePosting = this.loadMorePosting.bind(this);
		this.loadPosting = this.loadPosting.bind(this);
	}

	loadPosting(mode, keyword) {
		if(mode === 'searching') {
			this.setState({
				mode: 'searching',
				keyword: keyword
			});
			this.props.getPostingDataRequest(true, undefined, keyword).then(() => {
				if($(window).height() < $(document).height()) {
					this.setState({scrollButtonState: true});
				}
			});
		} else {
			this.setState({
				mode: 'all',
				data: {},
				keyword: ''
			});
			this.props.getPostingDataRequest(true).then(() => {
				if($(window).height() < $(document).height()) {
					this.setState({scrollButtonState: true});
				}
			});
		}
	}

	scrollTop() {
		$('html, body').animate({scrollTop: 0}, 'slow');
	}

	loadMorePosting() {
		if(this.props.isLast) {
			return new Promise((resolve, reject) => {
				resolve();
			});
		}

		let lastId = this.props.postingData[this.props.postingData.length - 1]._id;
		if(this.state.mode === 'all') {
			return this.props.getPostingDataRequest(false, lastId);
		} else {
			return this.props.getPostingDataRequest(false, lastId, this.state.keyword);
		}
	}

	componentDidMount() {
		if(!this.props.params.keyword) {
			console.log('loadMorePosting');
			this.loadPosting();
		} else {
			console.log('loadMorePosting with params');
			this.loadPosting('searching', this.props.params.keyword);
		}
	}

	render() {
		const scrollUpButton = (this.state.scrollButtonState) ?
			(
				<div className='fixed-action-btn'>
					<a className='btn-floating btn-large pink lighten-2' onClick={this.scrollTop}>
						<i className='material-icons'>arrow_upward</i>
					</a>
				</div>
			) : (undefined);

		const loadMoreButton = (
			<div className='center load-more'>
				<div className='btn-large pink lighten-2' onClick={this.loadMorePosting}>
					LOAD MORE POSTINGS
				</div>
			</div>
		);

		const loadEndButton = (
			<div className='center load-more'>
				<div className='btn-large pink lighten-2 disabled'>
					THIS IS THE LAST POSTING
				</div>
			</div>
		);

		return (
			<div className='wrapper'>
				<PostingList data={this.props.postingData}
							 isLoggedIn={this.props.isLoggedIn}
							 currentUser={this.props.currentUser}
							 onStar={this.handleStar}/>
				{this.props.isLast ? loadEndButton : loadMoreButton}
				{scrollUpButton}
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
		postingData: state.getPostingData.posting.data,
		isLast: state.getPostingData.posting.isLast,
		isLoggedIn: state.authentication.status.isLoggedIn,
		currentUser: state.authentication.status.currentUser
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPostingDataRequest: (isInitial, lastId, keyword) => {
			return dispatch(getPostingDataRequest(isInitial, lastId, keyword));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
