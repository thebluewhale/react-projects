import React from 'react';
import { connect } from 'react-redux';
import { Preloader } from '../components';
import { getAccountInfoRequest, deleteUserRequest, updateUserRequest } from '../actions/account';
import { deleteAllMarkerRequest } from '../actions/marker';
import './MyInfo.css' ;
import ErrorMessage from '../utils/ErrorMessage';

class MyInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			preloader: false,
			username: '',
			curPassword: '',
			newPassword: '',
			email: '',
			newEmail: '',
			created: '',
			deleteConfirmPassword: '',
			modalMode: 'UPDATE'
		};
		this.deleteModalInstance = null;
		this.updateModalInstance = null;
		this.onModalClosed = this.onModalClosed.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.setPreloaderState = this.setPreloaderState.bind(this);
		this.handleUpdateAccount = this.handleUpdateAccount.bind(this);
		this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
		this.showUpdateAccountModal = this.showUpdateAccountModal.bind(this);
		this.showDeleteAccountModal = this.showDeleteAccountModal.bind(this);
	}

	setPreloaderState(state) {
		if (typeof state !== 'boolean') {
			state = false;
		}
		if (this.state.preloader === state) {
			let _this = this;
			setTimeout(() => {
				_this.setState({preloader: state});
			}, 2000);
		}
		this.setState({preloader: state});
	}

	onModalClosed() {
		this.setState({
			curPassword: '',
			newPassword: '',
			newEmail: ''
		});
	}

	handleKeyPress(e) {
		if (e.charCode === 13) {
			if (this.state.modalMode === 'UPDATE') {
				this.handleUpdateAccount();
			} else {
				this.handleDeleteAccount();
			}
		}
	}

	handleInputChange(e) {
		let state = this.state;
		state[e.target.name] = e.target.value;
		this.setState({state});
		let _this = this;
	}

	showDeleteAccountModal() {
		this.setState({modalMode: 'DELETE'});
		this.deleteModalInstance.open();
	}

	showUpdateAccountModal() {
		this.setState({modalMode: 'UPDATE'});
		this.updateModalInstance.open();
	}

	handleUpdateAccount() {
		this.setPreloaderState(true);
		let username = this.state.username;
		let curPassword = this.state.curPassword;
		let newPassword = this.state.newPassword;
		let newEmail = this.state.newEmail;

		this.props.updateUserRequest(username, curPassword, newPassword, newEmail).then(() => {
			this.setPreloaderState(false);
			if (this.props.updateUser.status === 'SUCCESS') {
				this.updateModalInstance.close();
				window.M.toast({html: '수정되었습니다.', classes: 'styled-font', displayLength: 2000});
				let accountInfo = this.props.getInfo.accountInfo;
				this.setState({
					username: accountInfo.username,
					email: accountInfo.email,
					created: accountInfo.created.slice(0, 10)
				});
				window.M.updateTextFields();
			} else {
				let errorMsg = ErrorMessage.getUpdateUserErrorMessage(this.props.updateUser.errorCode);
				window.M.toast({html: errorMsg, classes: 'styled-font', displayLength: 2000})
			}
		});
	}

	handleDeleteAccount() {
		this.setPreloaderState(true);
		let deleteConfirmPassword = this.state.deleteConfirmPassword;

		this.props.deleteUserRequest(deleteConfirmPassword).then(() => {
			if (this.props.delete.status === 'SUCCESS') {
				this.props.deleteAllMarkerRequest().then(() => {
					this.setPreloaderState(false);
					if (this.props.deleteAll.status === 'SUCCESS') {
						this.deleteModalInstance.close();
						window.M.toast({html: '탈퇴가 완료되었습니다.', classes: 'styled-font', displayLength: 2000});
						this.props.history.replace('/');
					} else {
						window.M.toast({html: '다시 시도해주세요.', classes: 'styled-font', displayLength: 2000});
						this.showDeleteAccountModal();
					}
				});
			} else {
				this.setPreloaderState(false);
				let errorMsg = ErrorMessage.getLoginErrorMessage(this.props.delete.errorCode);
				window.M.toast({html: errorMsg, classes: 'styled-font', displayLength: 2000})
				this.showDeleteAccountModal();
			}
		});
	}

	componentDidMount() {
		this.setPreloaderState(true);
		this.props.getAccountInfoRequest().then(() => {
			this.setPreloaderState(false);
			if (this.props.getInfo.status === 'SUCCESS') {
				let accountInfo = this.props.getInfo.accountInfo;
				this.setState({
					username: accountInfo.username,
					email: accountInfo.email,
					created: accountInfo.created.slice(0, 10)
				});
				window.M.updateTextFields();
			} else {
				window.M.toast({html: '정보를 가져오는데 실패했습니다.', classes: 'styled-font', displayLength: 2000});
			}
		});

		let modalOptions = {
			onCloseEnd: this.onModalClosed
		};
		let deleteModalElem = document.querySelector('#accountDeleteModal');
		this.deleteModalInstance = window.M.Modal.init(deleteModalElem, modalOptions);
		let updateModalElem = document.querySelector('#accountUpdateModal');
		this.updateModalInstance = window.M.Modal.init(updateModalElem, modalOptions);
	}

	render() {
		const accountDeleteModal = (
			<div className='modal' id='accountDeleteModal'>
				<div className='modal-fixed-footer styled-font black-text'>
					<div className='modal-content'>
						<div className='row'>
							<div className='col s12 m12 l12'>
								<h5>회원탈퇴</h5>
							</div>
							<div className='input-field col s12 m12 l12'>
								<label htmlFor='deleteConfirmPassword'>비밀번호를 입력해주세요.</label>
								<input id='deleteConfirmPassword' type='password' name='deleteConfirmPassword' className='validate'
									minLength='4' maxLength='16'
									value={this.state.deleteConfirmPassword} onChange={this.handleInputChange}
									onKeyPress={this.handleKeyPress} />
							</div>
							<div className='col s12 m12 l12'>
								<p className='red-text'>
									저장한 장소는 모두 삭제되며,
									<br/>
									복구가 불가능합니다.
								</p>
							</div>
						</div>
					</div>
					<div className='modal-footer'>
						<a className='modal-close waves-effect waves-red btn-flat'
						   onClick={this.closeModal}>
							취소
						</a>
						<a className='modal-close waves-effect waves-green btn-flat'
						   onClick={this.handleDeleteAccount}>
							확인
						</a>
					</div>
				</div>
			</div>
		);

		const accountUpdateModal = (
			<div className='modal' id='accountUpdateModal'>
				<div className='modal-fixed-footer styled-font black-text'>
					<div className='modal-content'>
						<div className='row'>
							<div className='col s12 m12 l12'>
								<h5>정보변경</h5>
							</div>
							<div className='input-field col s12 m12 l12'>
								<label htmlFor='curPassword'>현재 비밀번호를 입력해주세요.</label>
								<input id='curPassword' type='password' name='curPassword' className='validate'
									   minLength='4' maxLength='16'
									   value={this.state.curPassword} onChange={this.handleInputChange}
									   onKeyPress={this.handleKeyPress} />
							</div>
							<div className='input-field col s12 m12 l12'>
								<label htmlFor='newPassword'>새 비밀번호를 입력해주세요.</label>
								<input id='newPassword' type='password' name='newPassword' className='validate'
									   minLength='4' maxLength='16'
									   value={this.state.newPassword} onChange={this.handleInputChange}
									   onKeyPress={this.handleKeyPress} />
							</div>
							<div className='input-field col s12 m12 l12'>
								<label htmlFor='newEmail'>새 이메일을 입력해주세요.</label>
								<input id='newEmail' type='email' name='newEmail' className='validate'
									   maxLength='32' value={this.state.newEmail}
									   onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} />
							</div>
						</div>
					</div>
					<div className='modal-footer'>
						<a className='modal-close waves-effect waves-red btn-flat'
						   onClick={this.closeModal}>
							취소
						</a>
						<a className='modal-close waves-effect waves-green btn-flat'
						   onClick={this.handleUpdateAccount}>
							확인
						</a>
					</div>
				</div>
			</div>
		);

		return (
			<div>
				<div className='container'>
					<div className='card-panel row pink lighten-4'>
						<div className='col s12'>
							<div className='input-field'>
								<input disabled value={this.state.username} id='username' type='text' className='validate' />
								<label htmlFor='username'>Username</label>
							</div>
						</div>
						<div className='col s12'>
							<div className='input-field'>
								<input disabled value={this.state.email} id='email' type='email' className='validate' />
								<label htmlFor='email'>E-mail</label>
							</div>
						</div>
						<div className='col s12'>
							<div className='input-field'>
								<input disabled value={this.state.created} id='created' type='text' className='validate' />
								<label htmlFor='created'>Created</label>
							</div>
						</div>
						<div className='col l3 s12 m12 waves-effect waves-light btn blue lighten-1'
							 onClick={this.showUpdateAccountModal}>
							회원 정보 수정
						</div>
						<div className='col l3 offset-l1 s12 m12 waves-effect waves-light btn red'
							 onClick={this.showDeleteAccountModal}>
							회원 탈퇴
						</div>
					</div>
				</div>
				{accountDeleteModal}
				{accountUpdateModal}

				{this.state.preloader ? <Preloader /> : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		getInfo: state.account.getInfo,
		delete: state.account.delete,
		updateUser: state.account.updateUser,
		deleteAll: state.marker.deleteAll
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAccountInfoRequest: () => {
			return dispatch(getAccountInfoRequest());
		},
		deleteUserRequest: (deleteConfirmPassword) => {
			return dispatch(deleteUserRequest(deleteConfirmPassword));
		},
		updateUserRequest: (username, curPassword, newPassword, newEmail) => {
			return dispatch(updateUserRequest(username, curPassword, newPassword, newEmail));
		},
		deleteAllMarkerRequest: () => {
			return dispatch(deleteAllMarkerRequest());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyInfo);
