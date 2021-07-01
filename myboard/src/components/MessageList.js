import React from 'react';
import {Message} from 'components';

class MessageList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const mapToComponents = (data) => {
			return data.map((message, i) => {
				return (
					<Message data={message}
						  	 key={message._id}
						  	 index={i}
							 to={this.props.to}
							 onMessageRemove={this.props.onMessageRemove}>
					</Message>
				);
			});
		}

		const emptyView = (
			<div className='container write'>
				<h4 className='deep-purple-text center'>
					No Message
				</h4>
			</div>
		);

		const messageView = (
			<div className='container'>
				<ul className='collection'>
					{mapToComponents(this.props.messageData)}
				</ul>
			</div>
		);

		return (
			<div>
				{this.props.messageData.length === 0 ? emptyView : messageView}
			</div>
		);
	}
};

MessageList.propTypes = {
	to: React.PropTypes.string,
	messageData: React.PropTypes.array,
	onMessageRemove: React.PropTypes.func
};

MessageList.defaultProps = {
	to: '',
	messageData: [],
	onMessageRemove: () => { console.log('onMessageRemove is not defined'); }
};

export default MessageList;
