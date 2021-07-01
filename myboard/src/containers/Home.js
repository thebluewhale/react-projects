import React from 'react';
import {connect} from 'react-redux';
import {Write, MemoList} from 'components';
import {
	memoPostRequest, memoListRequest,
	memoEditRequest, memoRemoveRequest,	memoStarRequest,
	replyPostRequest, replyRemoveRequest
} from '../actions/memo';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingState: false,
			initiallyLoaded: false
		};
		this.handlePost = this.handlePost.bind(this);
		this.loadNewMemo = this.loadNewMemo.bind(this);
		this.loadOldMemo = this.loadOldMemo.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleStar = this.handleStar.bind(this);
		this.handleReplyPost = this.handleReplyPost.bind(this);
		this.handleReplyRemove = this.handleReplyRemove.bind(this);
		this.loadUntilScrollable = this.loadUntilScrollable.bind(this);
		this.scrollTop = this.scrollTop.bind(this);
	}

	handlePost(contents) {
		return this.props.memoPostRequest(contents).then(
			() => {
				if(this.props.postStatus.status === 'SUCCESS' ) {
					this.loadNewMemo().then(
						() => {
							Materialize.toast('Post Success', 2000);
						}
					);
				} else {
					switch(this.props.postStatus.error) {
						case 1 :
							Materialize.toast('Login please', 2000);
							break;
						case 2 :
							Materialize.toast('content is required', 2000);
							break;
						default :
							Materialize.toast('Error occured on server', 2000);
							break;
					}
				}
			}
		);
	}

	handleEdit(id, index, contents) {
		return this.props.memoEditRequest(id, index, contents).then(
			() => {
				if(this.props.editStatus.status === 'SUCCESS') {
					Materialize.toast('Edit Success', 2000);
				} else {
					let errorMessage = [
						'Error occured in server',
						'Contents are required',
						'Login please',
						'Original Post is not exists',
						'Permission denied'
					];
					Materialize.toast(errorMessage[this.props.editStatus.error-1], 2000);

					if(this.props.editStatus.error === 3) {
						setTimeout(() => {
							location.reload(false);
						}, 2000);
					}
				}
			}
		);
	}

	handleRemove(id, index) {
		return this.props.memoRemoveRequest(id, index).then(
			() => {
				if(this.props.removeStatus.status === 'SUCCESS') {
					setTimeout(() => {
						if($('body').height() < $(window).height()) {
							this.loadOldMemo();
						}
					}, 1000);
				} else {
					let errorMessage = [
						'Error occured in server',
						'Login please',
						'Original Post is not exists',
						'Permission denied'
					];

					Materialize.toast(errorMessage[this.props.removeStatus.error-1], 2000);

					if(this.props.removeStatus.error === 2) {
						setTimeout(() => {
							location.reload();
						}, 2000);
					}
				}
			}
		);
	}

	handleStar(id, index) {
		return this.props.memoStarRequest(id, index).then(
			() => {
				if(this.props.starStatus.status !== 'SUCCESS') {
					let errorMessage = [
						'Error occured in server',
						'Login please',
						'Original Post is not exists',
					];

					Materialize.toast(errorMessage[this.props.starStatus.error-1], 2000);

					if(this.props.starStatus.error === 2) {
						setTimeout(() => {
							location.reload();
						}, 2000);
					}
				}
			}
		);
	}

	handleReplyPost(id, index, contents) {
		return this.props.replyPostRequest(id, index, contents).then(
			() => {
				if(this.props.replyPost.status === 'SUCCESS') {
					Materialize.toast('Reply Post Success', 2000);
				} else {
					let errorMessage = [
						'Error occured in server',
						'Invalid Memo Id',
						'Contents are required',
						'Login please',
						'Original Post is not exists',
						'Invalid server action'
					];
					Materialize.toast(errorMessage[this.props.replyPost.error-1], 2000);
				}
			}
		);
	}

	handleReplyRemove(parentId, parentIndex, replyIndex) {
		return this.props.replyRemoveRequest(parentId, parentIndex, replyIndex).then(
			() => {
				if(this.props.replyRemove.status === 'SUCCESS') {
					Materialize.toast('Reply Remove Success', 2000);

					this.props.memoListRequest(true, undefined, undefined, this.props.username).then(
						() => {
							setTimeout(this.loadUntilScrollable, 1000);
							this.setState({
								initiallyLoaded: true
							});
						}
					);

				} else {
					let errorMessage = [
						'Error occured in server',
						'Invalid Memo Id',
						'Contents are required',
						'Login please',
						'Original Post is not exists',
						'Invalid server action'
					];
					Materialize.toast(errorMessage[this.props.replyRemove.error-1], 2000);
				}
			}
		);
	}

	loadNewMemo() {
		if(this.props.listStatus === 'WAITING') {
			return new Promise((resolve, reject) => {
				resolve();
			});
		}

		if(this.props.memoData.length === 0) {
			return this.props.memoListRequest(true, undefined, undefined, this.props.username);
		}

		return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id);
	}

	loadOldMemo() {
		if(this.props.isLast) {
			return new Promise((resolve, reject) => {
				resolve();
			});
		}

		let lastId = this.props.memoData[this.props.memoData.length-1]._id;

		return this.props.memoListRequest(false, 'old', lastId, this.props.username).then(
			() => {
				if(this.props.isLast) {
					Materialize.toast('this is last post', 2000);
				}
			}
		);
	}

	loadUntilScrollable () {
		if($('body').height() < $(window).height()) {
			this.loadOldMemo().then(
				() => {
					if(!this.props.isLast) {
						loadUntilScrollable();
					}
				}
			);
		}
	}

	scrollTop() {
		$("html, body").animate({scrollTop:0}, 'slow');
	}

	componentDidMount() {
		this.loadUntilScrollable();

		this.props.memoListRequest(true, undefined, undefined, this.props.username).then(
			() => {
				setTimeout(this.loadUntilScrollable, 1000);
				this.setState({
					initiallyLoaded: true
				});
			}
		);

		$(window).scroll(() => {
			if($(document).height() - $(window).height() - $(window).scrollTop() < 25) {
				if(!this.state.loadingState) {
					this.loadOldMemo();
					this.setState({
						loadingState: true
					});
				} else {
					if(this.state.loadingState) {
						this.setState({
							loadingState: false
						});
					}
				}
			}
		});
	}

	componentWillUnMount() {
		$(window).unbind();
		this.setState({
			initiallyLoaded: false
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.username !== prevProps.username) {
			this.componentWillUnMount();
			this.componentDidMount();
		}
	}

	render() {
		const write = (<Write onPost={this.handlePost}/>);

		const userEmptyView = (
			<div className='container'>
				<div className='empty-page deep-purple-text'>
					<b>{this.props.username}</b> isn't registered or didn't write any memo.
				</div>
			</div>
		);

		const memoEmptyView = (
			<div className='container'>
				<div className='empty-page deep-purple-text'>
					<b>Post your memo now!</b>
				</div>
			</div>
		);

		const memoView = (
			<MemoList data={this.props.memoData}
					  currentUser={this.props.currentUser}
					  isLoggedIn={this.props.isLoggedIn}
					  onEdit={this.handleEdit}
					  onRemove={this.handleRemove}
					  onStar={this.handleStar}
					  onReplyPost={this.handleReplyPost}
					  onReplyRemove={this.handleReplyRemove}>
			</MemoList>
		);

		const mainView = (this.props.username === undefined) ?
							((this.props.memoData.length === 0) ? (memoEmptyView) : (memoView)) :
							((this.props.memoData.length === 0) ? (userEmptyView) : (memoView));

		const scrollUpButton = ($(window).height() < $(document).height()) ?
									(
										<div className="fixed-action-btn">
										    <a className="btn-floating btn-large deep-purple" onClick={this.scrollTop}>
										      <i className="large material-icons">navigation</i>
										    </a>
										</div>
									) :
									(undefined);

		return (
			<div className='wrapper'>
				{this.props.isLoggedIn ? write : undefined}
				{mainView}
				{scrollUpButton}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.authentication.status.isLoggedIn,
		postStatus: state.memo.post,
		currentUser: state.authentication.status.currentUser,
		memoData: state.memo.list.data,
		isLast: state.memo.list.isLast,
		editStatus: state.memo.edit,
		removeStatus: state.memo.remove,
		starStatus: state.memo.star,
		replyPost: state.memo.replyPost,
		replyRemove: state.memo.replyRemove
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		memoPostRequest: (contents) => {
			return dispatch(memoPostRequest(contents));
		},
		memoListRequest: (isInitial, listType, id, username) => {
			return dispatch(memoListRequest(isInitial, listType, id, username));
		},
		memoEditRequest: (id, index, contents) => {
			return dispatch(memoEditRequest(id, index, contents));
		},
		memoRemoveRequest: (id, index) => {
			return dispatch(memoRemoveRequest(id, index));
		},
		memoStarRequest: (id, index) => {
			return dispatch(memoStarRequest(id, index));
		},
		replyPostRequest: (id, index, contents) => {
			return dispatch(replyPostRequest(id, index, contents));
		},
		replyRemoveRequest: (parentId, parentIndex, replyIndex) => {
			return dispatch(replyRemoveRequest(parentId, parentIndex, replyIndex));
		}
	};
};

Home.propTypes = {
	username: React.PropTypes.string,
	isLoggedIn: React.PropTypes.bool
};

Home.defaultProps = {
	username: undefined,
	isLoggedIn: false
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
