import React from 'react';
import {connect} from 'react-redux';
import {ChatList, ChatWindow} from 'components';
import {
	sendMessageRequest, getMessageRequest, getChatListRequest
} from '../actions/chat';

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.handleSendMessage = this.handleSendMessage.bind(this);
		this.handleGetMessage = this.handleGetMessage.bind(this);
		this.handleGetChatList = this.handleGetChatList.bind(this);
	}

	handleSendMessage(contents, from, to) {
		return this.props.sendMessageRequest(contents, from, to).then(
			() => {
				if(this.props.sendMessageStatus === 'SUCCESS') {
					return true;
				} else {
					let errMsg = [
						'NOT LOGGED IN', 'NO MESSAGE TO SEND',
						'INVALID PARTNER NAME'
					];
					Materialize.toast(errMsg[this.props.sendMessageErrorCode - 1], 2000);
					return false;
				}
			}
		);
	}

	handleGetMessage(me, partner, isInitial, id) {
		return this.props.getMessageRequest(me, partner, isInitial, id).then(
			() => {
				if(this.props.getMessageStatus === 'SUCCESS') {
					return true;
				} else {
					return false;
				}
			}
		);
	}

	handleGetChatList(username) {
		return this.props.getChatListRequest(username).then(
			() => {
				if(this.props.getChatListStatus === 'SUCCESS') {
					return true;
				} else {
					Materialize.toast('CHATLIST REQUEST FAILED', 2000);
					return false;
				}
			}
		);
	}

	render() {
		const myView = (
			<div>
				<h3 className='center-text'>
					Choice chatting room<br></br>
					or find someone
				</h3>
			</div>
		);
		const chatView = (
			<ChatWindow onSendMessage={this.handleSendMessage}
						onGetMessage={this.handleGetMessage}
						onGetChatList={this.handleGetChatList}
						messageData={this.props.getMessageData}
						currentPartner={this.props.params.partner}
						currentUser={this.props.currentUser}/>
		);

		return (
			<div className='row'>
				<ChatList onGetChatList={this.handleGetChatList}
						  currentUser={this.props.currentUser}
						  chatListData={this.props.getchatListData}/>
				{this.props.params.partner === this.props.currentUser ? myView : chatView}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		sendMessageStatus: state.chat.send.status,
		sendMessageErrorCode: state.chat.send.error,
		getMessageStatus: state.chat.chat.status,
		getMessageErrorCode: state.chat.chat.error,
		getMessageData: state.chat.chat.data,
		getChatListStatus: state.chat.chatList.status,
		getchatListData: state.chat.chatList.data,
		currentUser: state.authentication.status.currentUser
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendMessageRequest: (contents, from, to) => {
			return dispatch(sendMessageRequest(contents, from, to));
		},
		getMessageRequest: (me, partner, isInitial, id) => {
			return dispatch(getMessageRequest(me, partner, isInitial, id));
		},
		getChatListRequest: (username) => {
			return dispatch(getChatListRequest(username));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
