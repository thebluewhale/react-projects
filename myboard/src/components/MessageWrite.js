import React from 'react';

class MessageWrite extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contents: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleMessageSend = this.handleMessageSend.bind(this);
	}

	handleChange(e) {
		this.setState({
			contents: e.target.value
		});
	}

	handleMessageSend() {
		let contents = this.state.contents;

		this.props.onMessageSend(this.props.to, contents).then(
			() => {
				this.setState({
					contents: ''
				});
			}
		);
	}

	render() {
		return (
			<div className='container write'>
				<h4 className='deep-purple-text center'>
					Send Message to <b>{this.props.to}</b>
				</h4>
				<div className='card'>
					<div className='card-content'>
						<textarea className='materialize-textarea'
								  placeholder='write your message'
								  value={this.state.contents}
								  onChange={this.handleChange}>
						</textarea>
					</div>
					<div className='card-action'>
						<a className='deep-purple-text' onClick={this.handleMessageSend}>SEND</a>
					</div>
				</div>
			</div>
		);
	}
}

MessageWrite.propTypes = {
	onMessageSend: React.PropTypes.func,
	to: React.PropTypes.string,
}

MessageWrite.defaultProps = {
	onMessageSend: (contents) => { console.log('onMessageSend function is not defined'); },
	to: ''
}

export default MessageWrite;
