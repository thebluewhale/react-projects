import React from 'react';
import { connect } from 'react-redux';
import { Title, TempPostings, AccountInfo, BookmarkedPostings } from '../components';
import './MyPage.css' ;
import { loadTempPostingsListRequest } from '../actions/posting';
import { accountGetBookmarksRequest } from '../actions/account';

class MyPage extends React.Component {
	constructor(props) {
		super(props);
		this.editTempPostingItem = this.editTempPostingItem.bind(this);
		this.accountGetBookmarksData = this.accountGetBookmarksData.bind(this);
		this.loadTempPostings = this.loadTempPostings.bind(this);
	}

	loadTempPostings() {
		return this.props.loadTempPostingsListRequest(this.props.session.currentUser);
	}

	accountGetBookmarksData() {
		return this.props.accountGetBookmarksRequest();
	}

	editTempPostingItem(postingId) {
		this.props.history.push(`/write/temp/${postingId}`);
	}

	render() {
		return (
			<div>
				<Title title='MY PAGE'
					   history={this.props.history} />
				<div className='row mypage-padding'>
					<div className='col s4 m4 l4'>
						<AccountInfo session={this.props.session} />
					</div>
					<div className='col s4 m4 l4'>
						<TempPostings tempPostingList={this.props.tempPostingList}
									  handleEditTempPostingItem={this.editTempPostingItem}
									  handleLoadTempPostings={this.loadTempPostings} />
					</div>
					<div className='col s4 m4 l4'>
						<BookmarkedPostings bookmarksData={this.props.bookmarksData} 
											history={this.props.history}
											handleAccountGetBookmarks={this.accountGetBookmarksData} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		session: state.account.session,
		tempPostingList: state.posting.tempPostingList,
		bookmarksData: state.account.bookmarks
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadTempPostingsListRequest: (author) => {
			return dispatch(loadTempPostingsListRequest(author));
		},
		accountGetBookmarksRequest: () => {
			return dispatch(accountGetBookmarksRequest());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
