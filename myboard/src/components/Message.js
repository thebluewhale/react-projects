import React from 'react';
import TimeAgo from 'react-timeago';

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.handleMessageRemove = this.handleMessageRemove.bind(this);
	}

	handleMessageRemove() {
		let id = this.props.data._id;
		let index = this.props.index;

		this.props.onMessageRemove(id, index);
	}

	render() {
		const {data} = this.props;

		return (
			<div>
				<li className='collection-item avatar'>
	      			<i className='material-icons circle deep-purple'>chat</i>
	  				<p className='title'>From : <b>{data.from}</b></p>
	  				<p>{data.contents}</p>
					<br></br>
					<p><TimeAgo date={data.date} live={true}/></p>
	      			<a onClick={this.handleMessageRemove}
					   className='secondary-content'>
					   <i className='material-icons deep-purple-text'>clear</i>
				   </a>
	    		</li>
				<li className='devider'></li>
			</div>
		);
	}
}

Message.propTypes = {
	data: React.PropTypes.object,
	index: React.PropTypes.number,
	to: React.PropTypes.string,
	onMessageRemove: React.PropTypes.func
}

Message.defaultProps = {
	data: {},
	index: -1,
	to: '',
	onMessageRemove: () => { console.log('onMessageRemove is not defined'); }
}

export default Message;
