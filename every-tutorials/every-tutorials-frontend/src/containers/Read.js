import React from 'react';
import { Title } from '../components';
import { MainView } from './index';
import { connect } from 'react-redux';
import { Contents, ContentsLeftbar } from '../components';
import './Read.css' ;
import { 
	readPostingItemRequest, removePostingItemRequest, removePostingItem
} from '../actions/posting';
import {
	accountManageBookmarksRequest, accountHasBookmarkedRequest
} from '../actions/account';

class Read extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			postingItem: {},
			preloader: true
		};
		this.setPreloaderVisibility = this.setPreloaderVisibility.bind(this);
		this.accountManageBookmarks = this.accountManageBookmarks.bind(this);
		this.checkHasBookmarked = this.checkHasBookmarked.bind(this);
		this.removePostingItem = this.removePostingItem.bind(this);
	}

	removePostingItem(postingId) {
		return this.props.removePostingItemRequest(postingId);
	}

	checkHasBookmarked(postingID, postingTitle) {
		return this.props.accountHasBookmarkedRequest(postingID, postingTitle);
	}

	accountManageBookmarks(postingID, postingTitle) {
		return this.props.accountManageBookmarksRequest(postingID, postingTitle);
	}

	setPreloaderVisibility(visibility) {
		if (visibility) {
			this.setState({preloader: true});
		} else {
			this.setState({preloader: false});
		}
	}

	componentDidMount() {
		this.props.readPostingItemRequest(this.props.match.params.postingItem).then(() => {
			if (this.props.postingItem.status === 'SUCCESS') {
				this.setState({postingItem: this.props.postingItem.data});
				this.setPreloaderVisibility(false);
			}
		});
	}

	render() {
		const contents = (
			<Contents postingData={this.state.postingItem}
					  history={this.props.history}
					  session={this.props.session}
					  manageBookmarks={this.props.manageBookmarks}
					  hasBookmarked={this.props.hasBookmarked}
					  removeItem={this.props.removeItem}
					  handleManageBookmarks={this.accountManageBookmarks}
					  handleHasBookmarked={this.checkHasBookmarked}
					  handleRemovePosting={this.removePostingItem} />
		);

		const preloader = (
			<div className='preloader-container'>
				<div className="preloader-wrapper big active">
					<div className="spinner-layer spinner-blue-only">
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
		);

		return (
			<div>
				<div className='read-leftbar-container'>
					{/*<ContentsLeftbar/>*/}
				</div>
				<div className='read-editor-container'>
					{this.state.preloader ? preloader : contents}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		postingItem: state.posting.postingItem,
		session: state.account.session,
		manageBookmarks: state.account.manageBookmarks,
		hasBookmarked: state.account.hasBookmarked.bookmarked,
		removeItem: state.posting.removeItem
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		readPostingItemRequest: (postingId) => {
			return dispatch(readPostingItemRequest(postingId));
		},
		accountManageBookmarksRequest: (postingID, postingTitle) => {
			return dispatch(accountManageBookmarksRequest(postingID, postingTitle));
		},
		accountHasBookmarkedRequest: (postingID, postingTitle) => {
			return dispatch(accountHasBookmarkedRequest(postingID, postingTitle));
		},
		removePostingItemRequest: (postingId) => {
			return dispatch(removePostingItemRequest(postingId));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Read);
