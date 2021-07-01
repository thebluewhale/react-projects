import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Contents.css';

class Contents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasBookmarked: false
		};
		this.goBackPage = this.goBackPage.bind(this);
		this.manageBookmark = this.manageBookmark.bind(this);
		this.coloringBookmarkIcon = this.coloringBookmarkIcon.bind(this);
	}

	coloringBookmarkIcon(coloring) {
		if (coloring) {
			window.$('.contents-bookmark-color').css('color', 'yellow');
			this.setState({hasBookmarked: true});
		} else {
			window.$('.contents-bookmark-color').css('color', 'grey');
			this.setState({hasBookmarked: false});
		}
	}

	manageBookmark() {
		this.props.handleManageBookmarks(this.props.postingData._id, this.props.postingData.title).then(() => {
			if (this.props.manageBookmarks.status === 'SUCCESS') {
				if (this.state.hasBookmarked) {
					window.Materialize.toast('REMOVE BOOKMARK SUCCESS', 2000);
					this.coloringBookmarkIcon(false);
				} else {
					window.Materialize.toast('ADD BOOKMARK SUCCESS', 2000);
					this.coloringBookmarkIcon(true);
				}
			} else {
				window.Materialize.toast('ERROR OCCURED ON SERVER', 2000);
			}
		});
	}

	goBackPage() {
		this.props.history.goBack();
	}

	componentDidMount() {
		window.$('#readBoard').html(this.props.postingData.contents);

		this.props.handleHasBookmarked(this.props.postingData._id, this.props.postingData.title).then(() => {
			if (this.props.hasBookmarked === true) {
				this.coloringBookmarkIcon(true);
			} else {
				this.coloringBookmarkIcon(false);
			}
		});
	}

	render() {
		const ownderButton = (
			<div>
				<div className='col s2 m2 l2'>
					<button className='waves-effect waves-light btn teal darken-4'>
						REMOVE
					</button>
				</div>
				<div className='col s2 m2 l2'>
					<button className='waves-effect waves-light btn teal darken-4'>
						MODIFY
					</button>
				</div>
			</div>
		);

		return (
			<div className='contents-background contents-padding'>
				<div className='row'>
					<div className='col s12 m12 l12'>
						<a className='black-text contents-back-icon' onClick={this.goBackPage}>
							<i className='left material-icons medium'>navigate_before</i>
						</a>
						<a className='contents-bookmark-color contents-bookmark-icon'
						   onClick={this.manageBookmark}>
							<i className='left material-icons medium'>star</i>
						</a>
						<div className='contents-title'>this is title</div>
					</div>
					<div className='col s12 m12 l12'>
						<div className='card-panel'>
							<div id='readBoard' />
						</div>
					</div>
					{this.props.session.currentUser === this.props.postingData.author ? ownderButton : undefined}
				</div>
			</div>
		);
	}
}

Contents.propTypes = {
	postingData: window.PropTypes.object,
	history: window.PropTypes.object,
	session: window.PropTypes.object,
	manageBookmarks: window.PropTypes.object,
	hasBookmarked: window.PropTypes.bool,
	handleManageBookmarks: window.PropTypes.func,
	handleHasBookmarked: window.PropTypes.func
};

Contents.defaultProps = {
	postingData: {
		author: '',
		category: '',
		title: '',
		contents: '',
		created: ''
	},
	history: {},
	session: {
		valid: false,
		isLoggedIn: false,
		currentUser: '',
		haveTempData: false
	},
	manageBookmark: {},
	hasBookmarked: false,
	handleManageBookmarks: () => { console.log('handleManageBookmarks is not defined'); },
	handleHasBookmarked: () => { console.log('handleHasBookmarked is not defined'); }
};

export default Contents;
