import React from 'react';
import TimeAgo from 'react-timeago';
import {Link} from 'react-router';
import {ReplyList} from 'components';

class Memo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			value: this.props.data.contents,
			replyMode: false
		};
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleStar = this.handleStar.bind(this);
		this.toggleReply = this.toggleReply.bind(this);
	}

	componentDidMount() {
		$(`#dropdown-button-setting-${this.props.data._id}`).dropdown({
            belowOrigin: true,
			constrain_width: false
        });
		$(`#dropdown-button-username-${this.props.data._id}`).dropdown({
            belowOrigin: true,
			constrain_width: false
        });
	}

	componentDidUpdate() {
		$(`#dropdown-button-setting-${this.props.data._id}`).dropdown({
            belowOrigin: true,
			constrain_width: false
        });
		$(`#dropdown-button-username-${this.props.data._id}`).dropdown({
            belowOrigin: true,
			constrain_width: false
        });
	}

	toggleEdit() {
		if(this.state.editMode) {
			let id = this.props.data._id;
			let index = this.props.index;
			let contents = this.state.value;

			this.props.onEdit(id, index, contents).then(
				() => {
					this.setState({
						editMode: !this.state.editMode
					});
				}
			);
		} else {
			this.setState({
				editMode: !this.state.editMode
			});
		}
	}

	handleRemove() {
		let id = this.props.data._id;
		let index = this.props.index;
		this.props.onRemove(id, index);
	}

	handleStar() {
		let id = this.props.data._id;
		let index = this.props.index;
		this.props.onStar(id, index);
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		});
	}

	toggleReply() {
		this.setState({
			replyMode: !this.state.replyMode
		});
	}

	render() {
		const {data, ownership} = this.props;

		const editInfo = (
			<span style={{color: '#AAB5BC'}}> (edited <TimeAgo date={data.date.edited} live={true}/>)</span>
		)

		const settingDropDownMenu = (
			<div className='option-button'>
				<a className='dropdown-button'
				   id={`dropdown-button-setting-${data._id}`}
				   data-activates={`dropdown-setting-${data._id}`}>
					<i className='material-icons icon-button'>settings</i>
				</a>
				<ul id={`dropdown-setting-${data._id}`} className='dropdown-content grey lighten-5'>
					<li><a className='deep-purple-text' onClick={this.toggleEdit}>Edit</a></li>
					<li className="divider"></li>
					<li><a className='deep-purple-text' onClick={this.handleRemove}>Remove</a></li>
				</ul>
			</div>
		)

		const userMessageDropDownMenu = (
			<li>
				<Link to={`/message/send/${data.writer}`}>
					<span className='deep-purple-text'>Send Message</span>
				</Link>
			</li>
		);

		const userDropDownMenu = (
				<span>
					<a className='dropdown-button username'
					   id={`dropdown-button-username-${data._id}`}
					   data-activates={`dropdown-username-${data._id}`}>
					   {data.writer}
					</a>
					<ul id={`dropdown-username-${data._id}`} className='dropdown-content grey lighten-5'>
						<li>
							<Link to={`/wall/${data.writer}`}>
								<span className='deep-purple-text'>Collection View</span>
							</Link>
						</li>
						<li className="divider"></li>
						{(this.props.isLoggedIn && (data.writer!==this.props.currentUser)) ?
							userMessageDropDownMenu : undefined}
					</ul>
				</span>
		);

		let starStyle = (data.starred.indexOf(this.props.currentUser) > -1) ? {color:'#ff9980'} : {} ;
		let replyInfo = (data.reply.length > 0) ? (data.reply.length + '개의 댓글') : ('첫 댓글 달기');
		let replyButton = (this.state.replyMode) ? ('댓글 접기') : (replyInfo);

		const memoView = (
			<div className='card'>
				<div className='info'>
					{userDropDownMenu} posted <TimeAgo  date={data.date.created}/>
					{data.is_edited ? editInfo : undefined}
					{ownership ? settingDropDownMenu : undefined}
				</div>
				<div className='card-content'>
					{data.contents}
				</div>
				<div className='footer'>
					<div className='left'>
						<i className='material-icons log-footer-icon star icon-button'
						   style={starStyle} onClick={this.handleStar}>start</i>
					   <span className='start-count'>{data.starred.length}</span>
					</div>
					<div className='right reply-toggle'>
						<a className="btn-flat deep-purple-text"
								  onClick={this.toggleReply}>{replyButton}</a>
					</div>
				</div>
				<ReplyList replyMode={this.state.replyMode}
						   parentIndex={this.props.index}
						   parentData={this.props.data}
						   currentUser={this.props.currentUser}
						   isLoggedIn={this.props.isLoggedIn}
						   onReplyPost={this.props.onReplyPost}
						   onReplyRemove={this.props.onReplyRemove}>
			   </ReplyList>
			</div>
		);

		const editView = (
			<div className='write'>
				<div className='card'>
					<div className='card-content'>
						<textarea className='materialize-textarea' onChange={this.handleChange}></textarea>
					</div>
					<div className='card-action'>
						<a onClick={this.toggleEdit}>OK</a>
					</div>
				</div>
			</div>
		);

		return (
			<div className='container memo'>
				{this.state.editMode ? editView : memoView}
			</div>
		)
	}
}

Memo.propTypes = {
	data: React.PropTypes.object,
	ownership: React.PropTypes.bool,
	onEdit: React.PropTypes.func,
	index: React.PropTypes.number,
	isLoggedIn: React.PropTypes.bool,
	onRemove: React.PropTypes.func,
	onStar: React.PropTypes.func,
	onReplyPost: React.PropTypes.func,
	onReplyRemove: React.PropTypes.func,
	currentUser: React.PropTypes.string
}

Memo.defaultProps ={
	data: {
		_id: 'defaultId',
		writer: 'defaultWriter',
		contents: 'defaultContents',
		starred: false,
		date: {
			created: new Date(),
			edited: new Date()
		},
		is_edited: false
	},
	ownership: true,
	onEdit: (id, index, contents) => { console.log('onEdit is not defined'); },
	index: -1,
	isLoggedIn: false,
	onRemove: (id, index) => { console.log('onRemove is not defined'); },
	onStar: (id, index) => { console.log('onStar is not defined'); },
	onReplyPost: (id, index, contents) => { console.log('onReplyPost is not defined'); },
	onReplyRemove: (id, parentIndex, replyIndex) => { console.log('onReplyRemove is not defined'); },
	currentUser: ''
}

export default Memo;
