import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fileListRequest, fileDeleteRequest} from '../actions/fileManagement';
import {MovieClip, MovieList} from 'components';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			initialLoad: false,
			nowLoading: false,
			skipGuideView: false
		};
		this.loadOldVideo = this.loadOldVideo.bind(this);
		this.loadUntilScrollable = this.loadUntilScrollable.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleGuideView = this.handleGuideView.bind(this);
	}

	handleDelete(deleteItemId, itemIndex) {
		return this.props.fileDeleteRequest(deleteItemId, itemIndex).then(() => {
			if(this.props.fileDeleteStatus === 'SUCCESS') {
				Materialize.toast('DELETE SUCCESS', 2000);
			} else {
				let errMsg = [
					'INVALID ITEM ID', 'NOT LOGGED IN',
					'NO VIDEO DATA DB', 'PERMISSION DENIED'
				];
				Materialize.toast(errMsg[this.props.fileDeleteErrorCode - 1], 2000);
			}
		});
	}

	loadOldVideo() {
		if(this.props.fileIsLast) {
			return new Promise((resolve, reject) => {
				resolve();
			});
		}

		let lastId = this.props.fileListData[this.props.fileListData.length - 1]._id;
		return this.props.fileListRequest(false, 'old', lastId).then(() => {
			Materialize.toast('THIS IS THE LAST VIDEO', 2000);
		});
	}

	loadUntilScrollable() {
		if($('body').height() < $(window).height()) {
			this.loadOldVideo().then(() => {
				if(!this.props.fileIsLast) {
					loadUntilScrollable();
				}
			});
		}
	}

	handleGuideView() {
		if(!this.state.skipGuideView) {
			this.setState({
				skipGuideView: true
			});
			document.cookie = 'skipGuideView=true';
		}
	}

	componentWillMount() {
		const loadingScreen = `<div id='loadingScreen'
							  style='z-index:99999; position:absolute;
							  		 top:0; left:0; width:100%; height:100%;
									 background-color:black; opacity:0.6;'/>`;
		$('#root').append(loadingScreen);

		function getCookie(name) {
			let value = '; ' + document.cookie;
			let parts = value.split('; ' + name + '=');
			if(parts.length == 2) {
				return parts.pop().split(';').shift();
			}
		}
		let skipGuideView = getCookie('skipGuideView');
		if(skipGuideView === 'true') {
			this.setState({
				skipGuideView: true
			});
		}
	}

	componentDidMount() {
		this.props.fileListRequest(true, undefined, undefined, this.props.wall).then(() => {
			if(this.props.fileListDataStatus === 'SUCCESS') {
				this.setState({
					initialLoad: true
				});
				$('#loadingScreen').remove();
			}
		});

		$(window).scroll(() => {
			if($(document).height() - $(window).height() - $(window).scrollTop() < 1) {
				if(!this.state.nowLoading) {
					this.loadOldVideo();
					this.setState({
						nowLoading: true
					});
				} else {
					this.setState({
						nowLoading: false
					});
				}
			}
		});
	}

	componentWillUnMount() {
		$(window).unbind();
		this.setState({
			initialLoad: false,
			nowLoading: false
		});
	}

	render() {
		const uploadView = (
			<div className='container'>
				<div className='fixed-action-btn'>
					<Link to='/upload'>
						<div className='btn-floating btn-large deep-purple darken-2'>
							<i className='large material-icons'>library_add</i>
						</div>
					</Link>
				</div>
			</div>
		);

		const guideView = (
			<div className='container'>
				<div className='card guidetext'>
					TO UPLOAD YOUR VIDEO, LOGIN PLEASE.
					<i className='material-icons right' onClick={this.handleGuideView}>
					   not_interested
				   </i>
				</div>
			</div>
		);

		return (
			<div className='home'>
				{this.state.skipGuideView ?
					(undefined) : (this.props.isLoggedIn ? uploadView : guideView)}
				<MovieList fileListData={this.props.fileListData}
						   currentUser={this.props.currentUser}
						   isLoggedIn={this.props.isLoggedIn}
						   onDelete={this.handleDelete}/>
			</div>
		);
	}
}

Home.propTypes = {
	wall: React.PropTypes.string
};

Home.defaultProps = {
	wall: undefined
};


const mapStateToProps = (state) => {
	return {
		fileListDataStatus: state.fileManagement.list.status,
		fileListData: state.fileManagement.list.data,
		fileIsLast: state.fileManagement.list.isLast,
		isLoggedIn: state.authentication.sessionStatus.isLoggedIn,
		currentUser: state.authentication.sessionStatus.currentUser,
		fileDeleteStatus: state.fileManagement.delete.status,
		fileDeleteErrorCode: state.fileManagement.delete.errorCode
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fileListRequest: (isInitial, requestType, id, wall) => {
			return dispatch(fileListRequest(isInitial, requestType, id, wall));
		},
		fileDeleteRequest: (deleteItemId, itemIndex) => {
			return dispatch(fileDeleteRequest(deleteItemId, itemIndex));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
