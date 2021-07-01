import React from 'react';
import {Reply} from 'components';

class ReplyList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contents: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleReplyPost = this.handleReplyPost.bind(this);
	}

	handleChange(e) {
		this.setState({
			contents: e.target.value
		});
	}

	handleReplyPost() {
		let parentId = this.props.parentData._id;
		let parentIndex = this.props.parentIndex;
		let contents = this.state.contents;

		this.props.onReplyPost(parentId, parentIndex, contents).then(
			() => {
				this.setState({
					contents: ''
				});
			}
		);
	}

	render() {
		const mapToComponents = (data) => {
			if(data === undefined) return;

			return data.map((reply, i) => {
				return (
					<Reply parentId={this.props.parentData._id}
						   replyData={reply}
						   currentUser={this.props.currentUser}
						   index={i}
						   key={reply._id}
						   onReplyRemove={this.props.onReplyRemove}>
					</Reply>
				);
			});
		}

		const replyEntry = (
			<div>
				<input onChange={this.handleChange}
					   value={this.state.contents}
					   placeholder='Comment your reply'
					   maxLength='32'/>
				   <a className='right deep-purple-text reply-post' onClick={this.handleReplyPost}>POST</a>
			</div>
		);

		const replyView = (
			<div className='reply-view'>
				{this.props.isLoggedIn ? replyEntry : undefined}
				<div>
					<ul className='reply-list'>
						{mapToComponents(this.props.parentData.reply)}
					</ul>
				</div>
			</div>
		);

		return (
			<div className='blue-grey lighten-5'>
				{this.props.replyMode ? replyView : undefined}
			</div>
		);
	}
}

ReplyList.propTypes = {
	replyMode: React.PropTypes.bool,
	parentIndex: React.PropTypes.number,
	parentData: React.PropTypes.object,
	currentUser: React.PropTypes.string,
	isLoggedIn: React.PropTypes.bool,
	onReplyPost: React.PropTypes.func,
	onReplyRemove: React.PropTypes.func
}

ReplyList.defaultProps = {
	replyMode: false,
	parentIndex: -1,
	parentData: {},
	currentUser: '',
	isLoggedIn: false,
	onReplyPost: () => { console.log('onReplyPost func is not defined'); },
	onReplyRemove: () => { console.log('onReplyRemove func is not defined'); }
}

export default ReplyList;
