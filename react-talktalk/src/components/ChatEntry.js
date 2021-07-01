import React from 'react';

class ChatEntry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageInput: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleChange(e) {
		this.setState({
			messageInput: e.target.value
		});
	}

	handleKeyPress(e) {
		if(e.charCode === 13) {
			let contents = e.target.value;
			let me = this.props.currentUser;
			let partner = this.props.currentPartner;
			this.props.onSendMessage(contents, me, partner).then(
				() => {
					let messageData = this.props.messageData;
					if(messageData.length) {
						let lastId = messageData[messageData.length - 1]._id;
						this.props.onGetMessage(me, partner, false, lastId);
					} else {
						this.props.onGetMessage(me, partner, true);
					}
					this.props.onGetChatList(this.props.currentUser);
				}
			);
			this.setState({
				messageInput: ''
			});

		}
	}

	render() {
		return (
			<div className='col s6 deep-purple lighten-5'>
				<div>
					<div className='input-field col s12 message-input'>
						<label>Message</label>
						<input type='text' name='message-input' className='validate'
							   onChange={this.handleChange} value={this.state.messageInput}
							   onKeyPress={this.handleKeyPress}/>
					</div>
				</div>
			</div>
		);
	}
}

ChatEntry.propTypes = {
	currentPartner: React.PropTypes.string,
	currentUser: React.PropTypes.string,
	onSendMessage: React.PropTypes.func,
	onGetMessage: React.PropTypes.func,
	messageData: React.PropTypes.array
};

ChatEntry.defaultProps = {
	currentPartner: 'ChatWindow',
	currentUser: '',
	onSendMessage: () => { console.log('onSendMessage is not defined'); },
	onGetMessage: () => { console.log('onGetMessage is not defined'); },
	messageData: []
};

export default ChatEntry;
