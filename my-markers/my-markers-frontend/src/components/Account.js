import React from 'react';
import { connect } from 'react-redux';
import Preloader from './Preloader';
import './Account.css' ;

class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageStatus: 'LOGIN',
			username: '',
			password: '',
			email: '',
			preloader: false
		};
		this.showLoginPage = this.showLoginPage.bind(this);
		this.showSigninPage = this.showSigninPage.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleConfirmButton = this.handleConfirmButton.bind(this);
		this.handleInputKeypress = this.handleInputKeypress.bind(this);
		this.validateInputs = this.validateInputs.bind(this);
	}

	showLoginPage() {
		this.setState({pageStatus: 'LOGIN'});
	}

	showSigninPage() {
		this.setState({pageStatus: 'SIGNIN'});
	}

	handleInputChange(e) {
		let state = this.state;
		state[e.target.name] = e.target.value;
		this.setState({state});
	}

	handleInputKeypress(e) {
		if (e.charCode === 13) {
			this.handleConfirmButton();
		}
	}

	validateInputs() {
 		let { username, password, email } = this.state;
		if (this.state.pageStatus === 'LOGIN') {
			if (username === '' || password === '') {
				return false;
			}
		} else {
			if (username === '' || password === '' || email === '') {
				return false;
			}
		}
		return true;
	}

	handleConfirmButton() {
		if (!this.validateInputs()) {
			window.M.toast({html: '회원정보를 입력해주세요.', inDuration: 2000});
			return;
		}

		this.setState({preloader: true});
		if (this.state.pageStatus === 'LOGIN') {
			let username = this.state.username;
			let password = this.state.password;
			this.props.loginRequest(username, password);
		} else {
			let username = this.state.username;
			let password = this.state.password;
			let email = this.state.email;
			this.props.addNewUserRequest(username, password, email).then((result) => {
				this.setState({preloader: false});
				if (result === true) {
					this.setState({
						pageStatus: 'LOGIN',
						email: ''
					});
				}
			});
		}
	}

	componentDidMount() {
		this.setState({preloader: false});
	}

	render() {
		const loginDiv = (
			<div className='row'>
				<div className='input-field col s12 m12 l12'>
					<label htmlFor='username'>USER NAME</label>
					<input id='username' type='text' name='username' className='validate'
						   onChange={this.handleInputChange} value={this.state.username}
						   onKeyPress={this.handleInputKeypress} />
				</div>
				<div className='input-field col s12 m12 l12'>
					<label htmlFor='password'>PASSWORD</label>
					<input id='password' type='password' name='password' className='validate'
						   onChange={this.handleInputChange} value={this.state.password}
						   onKeyPress={this.handleInputKeypress} />
				</div>
			</div>
		);

		const signinDiv = (
			<div className='row'>
				<div className='input-field col s12 m12 l12'>
					<label htmlFor='username'>USER NAME</label>
					<input id='username' type='text' name='username' className='validate'
						   onChange={this.handleInputChange} value={this.state.username}
						   onKeyPress={this.handleInputKeypress} />
				</div>
				<div className='input-field col s12 m12 l12'>
					<label htmlFor='password'>PASSWORD</label>
					<input id='password' type='password' name='password' className='validate'
						   onChange={this.handleInputChange} value={this.state.password}
						   onKeyPress={this.handleInputKeypress} />
				</div>
				<div className='input-field col s12 m12 l12'>
					<label htmlFor='email'>E-MAIL</label>
					<input id='email' type='email' name='email' className='validate'
						   onChange={this.handleInputChange} value={this.state.email}
						   onKeyPress={this.handleInputKeypress} />
				</div>
			</div>
		);

		const confirmButton = (
			<div className='row'>
				<div className='col s12 m12 l12 btn waves-effect waves-teal teal lighten-3 black-text'
					 onClick={this.handleConfirmButton}>
					GO!
				</div>
			</div>
		);

		return (
			<div className='container'>
				{this.state.preloader ? <Preloader /> : null}
				<div className='card'>
					<div className='card-tabs'>
						<ul className='tabs tabs-fixed-width'>
							<li className='tab'>
								<a onClick={this.showLoginPage}>LOGIN</a>
							</li>
							<li className='tab'>
								<a onClick={this.showSigninPage}>SIGNIN</a>
							</li>
						</ul>
					</div>
					<div className='card-content green lighten-5'>
						{this.state.pageStatus === 'LOGIN' ? loginDiv : signinDiv}
						{confirmButton}
					</div>
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);
