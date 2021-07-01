import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {fileUploadRequest} from '../actions/fileManagement';

class Upload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadFileName: '',
			uploadFileHandler: {}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			uploadFileName: e.target.files[0].name,
			uploadFileHandler: e.target.files[0]
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		if(this.props.currentUser === '') {
			Materialize.toast('TO UPLOAD YOUR VIDEO, LOGIN PLEASE', 2000);
			return;
		}

		if (this.state.uploadFileHandler) {
			let fileHandler = this.state.uploadFileHandler;
			let fileName = this.state.uploadFileName;
			let username = this.props.currentUser;

			return this.props.fileUploadRequest(username, fileHandler, fileName)
			.then(() => {
				if(this.props.fileUploadStatus === 'SUCCESS') {
					Materialize.toast('FILE UPLOAD SUCCESS', 2000);
					browserHistory.push('/');
				} else {
					let errMsg = [
						'THIS FILE ALREADY EXISTS',
						'TOO LARGE FILE',
						'INVALID FILE TYPE'
					];
					Materialize.toast(errMsg[this.props.uploadErrorCode - 1], 2000);
				}
			});
		}
	}

	render() {
		return (
			<div className='container'>
				<div className='upload'>
					<form onSubmit={this.handleSubmit} encType='multipart/form-data'>
						<div className='file-field input-field'>
							<div className='btn deep-purple darken-2'>
								<span>File</span>
								<input type='file' onChange={this.handleChange}/>
							</div>
							<div className='file-path-wrapper'>
								<input className='file-path validate' type='text'/>
							</div>
							<div className='right'>
								<input className='btn deep-purple darken-2'
									   type='submit' value='Upload'/>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

Upload.propTypes = {
};

Upload.defaultProps = {
};

const mapStateToProps = (state) => {
	return {
		fileUploadStatus: state.fileManagement.upload.status,
		isLoggedIn: state.authentication.sessionStatus.isLoggedIn,
		currentUser: state.authentication.sessionStatus.currentUser,
		uploadErrorCode: state.fileManagement.upload.errorCode
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fileUploadRequest: (username, fileHandler, fileName) => {
			return dispatch(fileUploadRequest(username, fileHandler, fileName));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
