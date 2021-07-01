import React from 'react';
import { connect } from 'react-redux';
import './AccountFormModal.css' ;

class AccountFormModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			passwordConfirm: '',
			email: ''
		}
		this.modalInstance = null;
		this.modalModeChanged = false;
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleAccountFormModalConfirmButton = this.handleAccountFormModalConfirmButton.bind(this);
		this.onModalClosed = this.onModalClosed.bind(this);
		this.handleFindAccountButton = this.handleFindAccountButton.bind(this);
	}

	onModalClosed() {
		this.props.onModalClosed();
	}

	handleFindAccountButton() {
		this.modalInstance.close();
		this.props.history.replace('/findaccount');
	}

	handleAccountFormModalConfirmButton() {
		let username = this.state.username;
		let password = this.state.password;
		let passwordConfirm = this.state.passwordConfirm;
		let email = this.state.email;
		let mode = this.props.modalMode;
		if ((mode === 'SIGNIN') && (password !== passwordConfirm)) {
			this.modalInstance.open();
			window.M.toast({html: '비밀번호를 확인해주세요.', classes: 'styled-font', displayLength: 2000});
			return;
		}
		return this.props.handleAccountFormModalConfirmButton(mode, username, password, email).then((ret) => {
			if (ret === true) {
				this.setState({
					username: '',
					password: '',
					email: ''
				});
				this.modalInstance.close();
			} else {
				this.modalInstance.open();
			}
		});
	}

	handleKeyPress(e) {
		if (e.charCode === 13) {
			this.handleAccountFormModalConfirmButton();
		}
	}

	handleInputChange(e) {
		let state = this.state;
		state[e.target.name] = e.target.value;
		this.setState({state});
	}

	componentDidMount() {
		let modalElem = document.querySelector('#accountFormModal');
		let modalOptions = {
			onCloseEnd: this.onModalClosed
		};
		this.modalInstance = window.M.Modal.init(modalElem, modalOptions);
	}

	componentWillUpdate(nextProps) {
		if (nextProps.modalMode !== this.props.modalMode && this.modalModeChanged) {
			this.modalModeChanged = false;
			this.setState({
				username: '',
				password: '',
				passwordConfirm: '',
				email: ''
			});
		} else {
			this.modalModeChanged = true;
		}
	}

	componentDidUpdate() {
		if (this.props.isModalOpen) {
			this.modalInstance.open();
		}
	}

	render() {
		const loginModal = (
			<div className='modal-fixed-footer styled-font black-text'>
				<div className='modal-content'>
					<div className='row'>
						<div className='col s12 m12 l12'>
							<h5>로그인</h5>
						</div>
						<div className='input-field col s12 m12 l12'>
							<label htmlFor='username'>USER NAME (최소 4자 / 최대 16자)</label>
							<input id='username' type='text' name='username' className='validate'
								   minLength='4' maxLength='16'
								   value={this.state.username} onChange={this.handleInputChange}
								   onKeyPress={this.handleKeyPress} />
						</div>
						<div className='input-field col s12 m12 l12'>
							<label htmlFor='password'>PASSWORD (최소 4자 / 최대 16자)</label>
							<input id='password' type='password' name='password' className='validate'
								   minLength='4' maxLength='16'
								   value={this.state.password} onChange={this.handleInputChange}
								   onKeyPress={this.handleKeyPress} />
						</div>
					</div>
					<div className='row'>
						<a className='col s12 m12 l2 btn-flat' onClick={this.handleFindAccountButton}>
							비밀번호 찾기
						</a>
					</div>
				</div>
				<div className='modal-footer'>
					<a className='modal-close waves-effect waves-red btn-flat'>
						취소
					</a>
					<a className='modal-close waves-effect waves-green btn-flat'
					   onClick={this.handleAccountFormModalConfirmButton}>
						확인
					</a>
				</div>
			</div>
		);

		const signInModal = (
			<div className='modal-fixed-footer styled-font black-text'>
				<div className='modal-content'>
					<div className='row'>
						<div className='col s12 m12 l12'>
							<h5>회원가입</h5>
						</div>
						<div className='input-field col s12 m12 l12'>
							<label htmlFor='username'>USER NAME (최소 4자 / 최대 16자)</label>
							<input id='username' type='text' name='username' className='validate'
								   minLength='4' maxLength='16'
								   value={this.state.username} onChange={this.handleInputChange}
								   onKeyPress={this.handleKeyPress} />
						</div>
						<div className='input-field col s12 m12 l12'>
							<label htmlFor='password'>PASSWORD (최소 4자 / 최대 16자)</label>
							<input id='password' type='password' name='password' className='validate'
								   minLength='4' maxLength='16'
								   value={this.state.password} onChange={this.handleInputChange}
								   onKeyPress={this.handleKeyPress} />
						</div>
						<div className='input-field col s12 m12 l12'>
							<label htmlFor='passwordConfirm'>CONFIRM PASSWORD</label>
							<input id='passwordConfirm' type='password' name='passwordConfirm' className='validate'
								   minLength='4' maxLength='16'
								   value={this.state.passwordConfirm} onChange={this.handleInputChange}
								   onKeyPress={this.handleKeyPress} />
						</div>
						<div className='input-field col s12 m12 l12'>
							<label htmlFor='email'>E-MAIL (최대 32자)</label>
							<input id='email' type='email' name='email' className='validate'
								   maxLength='32'
								   value={this.state.email} onChange={this.handleInputChange}
								   onKeyPress={this.handleKeyPress} />
						</div>
					</div>
				</div>
				<div className='modal-footer'>
					<a className='modal-close waves-effect waves-red btn-flat'>
						취소
					</a>
					<a className='modal-close waves-effect waves-green btn-flat'
					   onClick={this.handleAccountFormModalConfirmButton}>
						확인
					</a>
				</div>
			</div>
		);

		const accountFormModal = (
			<div className='modal' id='accountFormModal'>
				{this.props.modalMode === 'LOGIN' ? loginModal : signInModal}
			</div>
		);

		const contactUsModal = (
			<div className='modal'>
				<div className='modal-fixed-footer styled-font'>
					<div className='modal-content'>
						<div className='row'>
							<h5 className='center deep-purple-text text-darken-4'>
								www.mymarker.site<br/>
								현재 베타서비스중입니다.<br/>
								건의/문의사항은<br/>
								struct.st.x@gmail.com으로<br/>
								메일보내주세요.<br/>
								감사합니다.
							</h5>
						</div>
					</div>
					<div className='modal-footer'>
						<a className='modal-close waves-effect waves-green btn-flat'>
							확인
						</a>
					</div>
				</div>
			</div>
		);

		return (
			<div>
				{this.props.modalMode === 'CONTACTUS' ? contactUsModal : accountFormModal}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountFormModal);
