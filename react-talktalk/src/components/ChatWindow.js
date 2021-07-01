import React from 'react';

class ChatWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageInput: ''
		};
		this.refreshTimer = null;
		this.checkPartner = '';
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.chatRefresh = this.chatRefresh.bind(this);
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

	chatRefresh() {
		this.refreshTimer = setInterval( () => {
			console.log('chatRefresh');
			let me = this.props.currentUser;
			let partner = this.props.currentPartner;
			let messageData = this.props.messageData;
			if(this.checkPartner === partner) {
				if(messageData.length) {
					let lastId = messageData[messageData.length - 1]._id;
					this.props.onGetMessage(me, partner, false, lastId);
				} else {
					this.props.onGetMessage(me, partner, true);
				}
			} else {
				this.checkPartner = partner;
				this.props.onGetMessage(me, partner, true);
			}
		}, 1000);
	}

	componentDidMount() {
		let me = this.props.currentUser;
		let partner = this.props.currentPartner;
		this.props.onGetMessage(me, partner, true);
		this.chatRefresh();
	}

	componentWillUnmount() {
		clearInterval(this.refreshTimer);
	}

	render() {
		const mapDataToMessage = (data) => {
			return data.map((message, i) => {
				if(message.from == this.props.currentPartner) {
					return (
						<div className='col full-width' key={i}>
							<div className='col s12 m5 left'>
								<div className='card teal lighten-2'>
									<div className='card-content white-text left-text'>
										{message.contents}
									</div>
								</div>
							</div>
						</div>
					);
				} else {
					return (
						<div className='col full-width' key={i}>
							<div className='col s12 m5 right'>
								<div className='card deep-purple lighten-2'>
									<div className='card-content white-text right-text'>
										{message.contents}
									</div>
								</div>
							</div>
						</div>
					);
				}
			});
		}

		return (
			<div className='col s6 deep-purple lighten-5 chatwindow'>
				<div className='col s6 current-partner'>{this.props.currentPartner}</div>
				<div>
					<div className='input-field col s12 message-input'>
						<label>Message</label>
						<input type='text' name='message-input' className='validate'
							   onChange={this.handleChange} value={this.state.messageInput}
							   onKeyPress={this.handleKeyPress}/>
					</div>
				</div>
				<div>
					<div className='row'>
						{mapDataToMessage(this.props.messageData)}
					</div>
				</div>
			</div>
		);
	}
}

ChatWindow.propTypes = {
	currentPartner: React.PropTypes.string,
	currentUser: React.PropTypes.string,
	onSendMessage: React.PropTypes.func,
	onGetMessage: React.PropTypes.func,
	messageData: React.PropTypes.array
};

ChatWindow.defaultProps = {
	currentPartner: 'ChatWindow',
	currentUser: '',
	onSendMessage: () => { console.log('onSendMessage is not defined'); },
	onGetMessage: () => { console.log('onGetMessage is not defined'); },
	messageData: []
};

export default ChatWindow;
