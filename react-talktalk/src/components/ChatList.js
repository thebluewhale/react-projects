import React from 'react';
import {Link} from 'react-router';

class ChatList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onGetChatList(this.props.currentUser);
		document.getElementById('chatList').style.minHeight =
			$(window).height() - $('#header').height() + 'px';
	}

	render() {
		const mapDataToList = (data) => {
			return data.map((list, i) => {
				return (
					<Link to={'/chat/'+list} key={i}>
						<div className='card blue-grey lighten-2'>
							<div className='card-content white-text left-text'>
								{list}
							</div>
						</div>
					</Link>
				);
			});
		}

		return (
			<div id='chatList' className='col s6'>
				<div>
					<div className='row'>
						{mapDataToList(this.props.chatListData)}
					</div>
				</div>
			</div>
		);
	}
}

ChatList.propTypes = {
	chatListData: React.PropTypes.array,
	currentUser: React.PropTypes.string,
	onGetChatList: React.PropTypes.func
};

ChatList.defaultProps = {
	chatListData: [],
	currentUser: '',
	onGetChatList: () => { console.log('onGetChatList is not defined'); }
};


export default ChatList;
