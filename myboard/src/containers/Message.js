import React from 'react';
import {connect} from 'react-redux';
import {MessageWrite, MessageList} from 'components';
import {browserHistory} from 'react-router';
import {
	messageSendRequest, messageListRequest, messageRemoveRequest
} from '../actions/message';


class Message extends React.Component {
	constructor(props) {
		super(props);
		this.handleMessageSend = this.handleMessageSend.bind(this);
		this.handleMessageRemove = this.handleMessageRemove.bind(this);
	}

	handleMessageSend(to, contents) {
		return this.props.messageSendRequest(to, contents).then(
			() => {
				if(this.props.messageSend.status === 'SUCCESS' ) {
					Materialize.toast('Message Send Success', 2000);
					browserHistory.push('/home');
				} else {
					let errorMsg = ['Log in please', 'Contents is required',
										'Error occured on server'];
					Materialize.toast(this.props.messageSend.error - 1, 2000);
				}
			}
		);
	}

	handleMessageRemove(id, index) {
		return this.props.messageRemoveRequest(id, index).then(
			() => {
				if(this.props.messageRemove.status === 'SUCCESS') {
					Materialize.toast('Message remove success', 2000);
				} else {
					let errorMsg = ['Error occured on server', 'Log in please',
										'No Message Exists', 'Permission error',
										'Error occured on server'];
					Materialize.toast(errorMsg[this.props.messageRemove.error - 1], 2000);
				}
			}
		);
	}

	componentDidMount() {
		this.props.messageListRequest(this.props.currentUser);
	}

	render() {
		const sendView = (
			<MessageWrite to={this.props.params.to} onMessageSend={this.handleMessageSend}/>
		);

		const readView = (
			<MessageList to={this.props.params.to}
						 messageData={this.props.messageData}
						 onMessageRemove={this.handleMessageRemove}>
		 	</MessageList>
		)

		const messageView = (this.props.params.mode === 'send') ? (sendView) : (readView);

		return (
			<div>
				{messageView}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.authentication.status.currentUser,
		messageSend: state.message.send,
		messageData: state.message.list.data,
		messageRemove: state.message.remove
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		messageSendRequest: (to, contents) => {
			return dispatch(messageSendRequest(to, contents));
		},
		messageListRequest: (username) => {
			return dispatch(messageListRequest(username));
		},
		messageRemoveRequest: (id, index) => {
			return dispatch(messageRemoveRequest(id, index));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
