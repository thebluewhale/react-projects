import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {MyInfoView} from 'components';
import {saveChangeRequest, logoutRequest} from '../actions/authentication';


class MyInfo extends React.Component {
	constructor(props) {
		super(props);
		this.onHandleSaveChange = this.onHandleSaveChange.bind(this);
	}

	onHandleSaveChange(username, ePassword, nPassword, nEmail) {
		return this.props.saveChangeRequest(username, ePassword, nPassword, nEmail).then(
			() => {
				if(this.props.saveChangeInfo.status === 'SUCCESS') {
					Materialize.toast('Save change success and logout', 2000);
					this.props.logoutRequest().then(
						() => {
							Materialize.toast('Re log in please', 2000);

							let loginData = {
								isLoggedIn: false,
								username: ''
							};

							document.cookie = 'key=' + btoa(JSON.stringify(loginData));
							browserHistory.push('/login');
						}
					);
				} else {
					let errorMsg = ['Log in please', 'Bad Password', 'Bad Email',
									'No user data exist', 'Invalid password'];
					Materialize.toast(errorMsg[this.props.saveChangeInfo.error-1], 2000);
				}
			}
		);
	}

	render() {
		return (
			<div className='container auth'>
				<div className='card'>
					<div className='header deep-purple white-text center'>
						<div className='card-content'>MY INFO</div>
					</div>
					<MyInfoView userInfoData={this.props.userInfo} onHandleSaveChange={this.onHandleSaveChange}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.authentication.userInfo.data,
		saveChangeInfo: state.authentication.saveChange
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		saveChangeRequest: (username, ePassword, nPassword, nEmail) => {
			return dispatch(saveChangeRequest(username, ePassword, nPassword, nEmail));
		},
		logoutRequest: () => {
			return dispatch(logoutRequest());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyInfo);
