import React from 'react';
import { connect } from 'react-redux';
import { Preloader } from '../components';
import { sendTempPasswordRequest } from '../actions/account';
import './FindAccount.css' ;
import ErrorMessage from '../utils/ErrorMessage';

class FindAccount extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			preloader: false,
			usernameForFind: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.setPreloaderState = this.setPreloaderState.bind(this);
		this.handleSendTempPassword = this.handleSendTempPassword.bind(this);
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

	handleKeyPress(e) {
		if (e.charCode === 13) {
			this.handleDeleteAccount();
		}
	}

	handleInputChange(e) {
		let state = this.state;
		state[e.target.name] = e.target.value;
		this.setState({state});
		let _this = this;
	}

	handleSendTempPassword() {
		this.setPreloaderState(true);
		let usernameForFind = this.state.usernameForFind;
		this.props.sendTempPasswordRequest(usernameForFind).then(() => {
			this.setPreloaderState(false);
			if (this.props.sendTempPassword.status === 'SUCCESS') {
				window.M.toast({html: '이메일을 발송하였습니다.', classes: 'styled-font', displayLength: 2000});
				this.props.history.replace('/');
			} else {
				window.M.toast({html: '일시적인 오류가 발생했습니다.', classes: 'styled-font', displayLength: 2000});
			}
		});
	}

	render() {
		return (
			<div>
				{this.state.preloader ? <Preloader /> : null}

				<div className='container'>
					<div className='card-panel row pink lighten-4'>
						<div className='col s12'>
							<div className='input-field'>
								<input value={this.state.usernameForFind} id='usernameForFind' 
									   type='text' className='validate' name='usernameForFind'
									   onChange={this.handleInputChange}
									   onKeyPress={this.handleKeyPress} />
								<label htmlFor='usernameForFind'>Username</label>
							</div>
						</div>
						<div className='col s12'>
							<p className='styled-font black-text'>
								아이디를 입력하고 아래 버튼을 누르시면
								<br/>
								회원가입때 입력하신 이메일로
								<br/>
								임시 비밀번호가 전송됩니다.
							</p>
						</div>
						<div className='col l3 s12 m12 waves-effect waves-light btn blue lighten-1'
							 onClick={this.handleSendTempPassword}>
							임시 비밀번호 전송
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		sendTempPassword: state.account.sendTempPassword
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendTempPasswordRequest: (username) => {
			return dispatch(sendTempPasswordRequest(username));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FindAccount);
