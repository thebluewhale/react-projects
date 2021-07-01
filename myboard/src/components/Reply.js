import React from 'react';

class Reply extends React.Component {
	constructor(props) {
		super(props);
		this.handleReplyRemove = this.handleReplyRemove.bind(this);
	}

	handleReplyRemove() {
		let parentId = this.props.parentId;
		let parentIndex = this.props.parentIndex;
		let replyIndex = this.props.index;

		this.props.onReplyRemove(parentId, parentIndex, replyIndex);
	}

	render() {
		const {writer, contents} = this.props.replyData;

		const removeIcon = (
			<a onClick={this.handleReplyRemove}><i className='material-icons deep-purple-text right'>clear</i></a>
		);

		const removeIconView = (this.props.currentUser === writer) ? removeIcon : undefined;

		return(
			<li><b>{writer}</b> : {contents} {removeIconView}</li>
		);
	}
}

Reply.propTypes = {
	parentId: React.PropTypes.string,
	replyData: React.PropTypes.object,
	index: React.PropTypes.number,
	currentUser: React.PropTypes.string,
	onReplyRemove: React.PropTypes.func
}

Reply.defaultProps = {
	parentId: -1,
	replyData: {},
	index: -1,
	currentUser: '',
	onReplyRemove: () => { console.log('onReplyRemove is not defined'); }
}

export default Reply;
