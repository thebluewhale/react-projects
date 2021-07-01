import React from 'react';
import { Title } from '../components';
import { connect } from 'react-redux';
import { Editor, EditorLeftbar } from '../components';
import './Write.css' ;
import {
	postNewPostingRequest, saveTempPostingRequest, loadTempPostingItemRequest, modifyPostingItemRequest
} from '../actions/posting';

class Write extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			preloader: true
		};
		this.postNewPostingRequest = this.postNewPostingRequest.bind(this);
		this.saveTempPostingRequest = this.saveTempPostingRequest.bind(this);
		this.setPreloaderVisibility = this.setPreloaderVisibility.bind(this);
		this.modifyPostingItem = this.modifyPostingItem.bind(this);
	}

	modifyPostingItem(postingId, data) {
		return this.props.modifyPostingItemRequest(postingId, data).then(() => {
			window.Materialize.toast('Modify success', 2000);
			this.props.history.replace('/');
		});
	}

	saveTempPostingRequest(data) {
		return this.props.saveTempPostingRequest(data).then(() => {
			window.Materialize.toast('Save temp data success', 2000);
			let thisLocation = this.props.history.location.pathname;
			this.props.history.replace(thisLocation);
		});
	}

	postNewPostingRequest(data) {
		return this.props.postNewPostingRequest(data).then(() => {
			window.Materialize.toast('Posting success', 2000);
			this.props.history.replace('/');
		});
	}

	setPreloaderVisibility(visibility) {
		if (visibility) {
			this.setState({preloader: true});
		} else {
			this.setState({preloader: false});
		}
	}

	componentDidMount() {
		if (this.props.match.params.mode === 'temp') {
			let postingId = this.props.match.params.postingId;
			this.props.loadTempPostingItemRequest(postingId).then(() => {
				if (this.props.tempPostingItem.status === 'SUCCESS') {
					this.setPreloaderVisibility(false);
				}
			});
		} else if (this.props.match.params.mode === 'modify') {
			this.setPreloaderVisibility(false);
		} else {
			this.setPreloaderVisibility(false);
		}
	}

	render() {
		const preloader = (
			<div className='preloader-container'>
				<div className="preloader-wrapper big active">
					<div className="spinner-layer spinner-blue-only">
						<div className="circle-clipper left">
							<div className="circle" />
						</div>
						<div className="gap-patch">
							<div className="circle" />
						</div>
						<div className="circle-clipper right">
							<div className="circle" />
						</div>
					</div>
				</div>
			</div>
		);

		const tempEditor = (
			<Editor postNewPostingRequest={this.postNewPostingRequest}
					saveTempPostingRequest={this.saveTempPostingRequest}
					session={this.props.session}
					match={this.props.match}
					hisotry={this.props.history}
					tempPostingData={this.props.postingItem.data} />
		);

		const modifyEditor = (
			<Editor modifyPostingItem={this.modifyPostingItem}
					session={this.props.session}
					match={this.props.match}
					hisotry={this.props.history}
					postingData={this.props.postingItem.data} />
		);

		const editor = (
			this.props.match.params.mode === 'temp' ? tempEditor : modifyEditor
		);

		return (
			<div className='write-container'>
				<div className='write-leftbar-container'>
					{/*<EditorLeftbar/>*/}
				</div>
				<div className='write-editor-container'>
					<Title title='Write Page'
						   backgroundColor='teal darken-4'
						   history={this.props.history} />
					{this.state.preloader ? preloader : editor}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		session: state.account.session,
		tempPostingItem: state.posting.tempPostingItem,
		postingItem: state.posting.postingItem
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		postNewPostingRequest: (data) => {
			return dispatch(postNewPostingRequest(data));
		},
		saveTempPostingRequest: (data) => {
			return dispatch(saveTempPostingRequest(data))
		},
		loadTempPostingItemRequest: (postingId) => {
			return dispatch(loadTempPostingItemRequest(postingId));
		},
		modifyPostingItemRequest: (postingId, data) => {
			return dispatch(modifyPostingItemRequest(postingId, data));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Write);
