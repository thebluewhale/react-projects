import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Editor.css';
import Configs from '../../utils/Configs';

class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			category: 'BLOG'
		};
		this.handlePostPostingRequest = this.handlePostPostingRequest.bind(this);
		this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleSaveTempPostingRequest = this.handleSaveTempPostingRequest.bind(this);
		this.setTempPostingData = this.setTempPostingData.bind(this);
		this.setModifyPostingData = this.setModifyPostingData.bind(this);
	}

	handleCategoryChange(e) {
		e.preventDefault();
		this.setState({category: e.target.value});
	}

	handleTitleInputChange(e) {
		this.setState({title: e.target.value});
	}

	handlePostPostingRequest() {
		let author = this.props.session.currentUser;
		let title = this.state.title;
		let category = this.state.category;
		let contents = window.CKEDITOR.instances.tutorialEditor.getData();
		let data = {author: author, category: category, title: title, contents: contents};
		if (this.props.match.params.mode === 'new') {
			this.props.postNewPostingRequest(data);
		} else {
			// change origin data to this data
			let postingId = this.props.match.params.postingId;
			this.props.modifyPostingItem(postingId, data);
		}
	}

	handleSaveTempPostingRequest() {
		let author = this.props.session.currentUser;
		let title = this.state.title;
		let category = this.state.category;
		let contents = window.CKEDITOR.instances.tutorialEditor.getData();
		let tempItemId = this.props.match.params.postingId;
		let data = {
			author: author,
			category: category,
			title: title,
			contents: contents,
			tempItemId: tempItemId
		};
		this.props.saveTempPostingRequest(data);
	}

	setTempPostingData() {
		let _this = this;
		let dataChecker = setInterval(() => {
			if (this.props.tempPostingData.hasOwnProperty('_id')) {
				let tempPostingData = _this.props.tempPostingData;
				_this.setState({title: tempPostingData.title});
				window.CKEDITOR.instances.tutorialEditor.setData(tempPostingData.contents);
				window.$('select').val(tempPostingData.category).material_select();
				clearInterval(dataChecker);
			}
		}, 100);
	}

	setModifyPostingData() {
		let _this = this;
		let dataChecker = setInterval(() => {
			if (this.props.postingData.hasOwnProperty('_id')) {
				let postingData = _this.props.postingData;
				_this.setState({title: postingData.title});
				window.CKEDITOR.instances.tutorialEditor.setData(postingData.contents);
				window.$('select').val(postingData.category).material_select();
				clearInterval(dataChecker);
			}
		}, 100);
	}

	componentDidMount() {
		window.CKEDITOR.replace('tutorialEditor', {
			filebrowserUploadUrl: '/posting/upload/image',
			height: '500',
			resize_enabled: false
		});

		window.$('select').material_select();
		window.$('select').change((e) => {
			this.handleCategoryChange(e);
		});
		window.$('#postingTitle').focus();
		if (this.props.match.params.mode === 'temp') {
			this.setTempPostingData();
		} else if (this.props.match.params.mode === 'modify') {
			this.setModifyPostingData();
		}
	}

	render() {
		const populateSelectOptions = (options) => {
			return options.map((option, i) => {
				return (
					<option value={option} key={i}>{option}</option>
				);
			});
		};

		return (
			<div className='editor-background editor-margin'>
				<div className='row'>
					<div className='col s8 m8 l8'>
						<div className='input-field'>
							<input id='postingTitle' className='validate' type='text'
									value={this.state.title}
									onChange={this.handleTitleInputChange} />
							<label htmlFor='postingTitle'>Your Posting Title Here</label>
						</div>
					</div>
					<div className='input-field col s4 m4 l4'>
						<select>
							{populateSelectOptions(Configs.getCategory())}
						</select>
						<label>Category Select</label>
					</div>
				</div>
				<div className='row'>
					<div className='col s12 m12 l12'>
						<textarea id='tutorialEditor' name='contents'>
						</textarea>
					</div>
				</div>
				<div className='row'>
					<div className='col s3 m3 l3'>
						<button className='waves-effect waves-light btn teal darken-4'
								onClick={this.handlePostPostingRequest}>
							POST
						</button>
					</div>
					{this.props.match.params.mode != 'modify' ?
						(<div className='col s3 m3 l3'>
							<button className='waves-effect waves-light btn teal darken-4'
									onClick={this.handleSaveTempPostingRequest}>
								SAVE TEMPORARILY
							</button>
						</div>) : undefined}
				</div>
			</div>
		);
	}
}

Editor.propTypes = {
	postNewPostingRequest: window.PropTypes.func,
	saveTempPostingRequest: window.PropTypes.func,
	modifyPostingItem: window.PropTypes.func,
	sesseion: window.PropTypes.object,
	tempPostingData: window.PropTypes.object,
	match: window.PropTypes.object,
	history: window.PropTypes.object
};

Editor.defaultProps = {
	postNewPostingRequest: () => { console.log('postNewPostingRequest is not defined'); },
	saveTempPostingRequest: () => { console.log('saveTempPostingRequest is not defined'); },
	modifyPostingItem: () => { console.log('modifyPostingItem is not defined'); },
	session: {
		valid: false,
		isLoggedIn: false,
		currentUser: ''
	},
	tempPostingData: {},
	match: {}
};

export default Editor;
