import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './AccountForm.css';

class AccountForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			password_confirmation: '',
			email: ''
		};
		this.handleLoginRequest = this.handleLoginRequest.bind(this);
		this.handleSignupRequest = this.handleSignupRequest.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleInputchange = this.handleInputchange.bind(this);
	}

	handleInputchange(e) {
		let eachInput = {};
		eachInput[e.target.name] = e.target.value;
		this.setState(eachInput);
	}

	handleKeyPress(e) {
		if (e.charCode == 13) {
			if (this.props.requestType == 'login') {
				this.handleLoginRequest();
			} else {
				this.handleSignupRequest();
			}
		}
	}

	handleLoginRequest() {
		let username = this.state.username;
		let password = this.state.password;
		if (!username || !password) {
			window.Materialize.toast('Please fill all inputs', 2000);
		} else {
			this.props.loginRequest(username, password).then(() => {
				if (this.props.login.status === 'SUCCESS') {
					window.Materialize.toast('Login success', 2000);
					this.props.history.replace('/');
				} else {
					let errorMsg = ['Username is not exists', 'Wrong password', 'Not confirmed account'];
					let toastMsg = errorMsg[this.props.login.errorCode - 1];
					window.Materialize.toast(toastMsg, 2000);
				}
			});
		}
	}

	handleSignupRequest() {
		let username = this.state.username;
		let password = this.state.password;
		let password_confirmation = this.state.password_confirmation;
		let email = this.state.email;
		
		if (!username || !password || !password_confirmation || !email) {
			window.Materialize.toast('Please fill all inputs', 2000);
		} else if (password != password_confirmation) {
			window.Materialize.toast('Check your password', 2000);
		} else {
			this.props.signupRequest(username, password, email).then(() => {
				if (this.props.signup.status === 'SUCCESS') {
					this.setState({
						username: '',
						password: '',
						password_confirmation: '',
						email: ''
					});
					window.Materialize.toast('signup success', 2000);
					this.props.history.replace('/account/login');
				}
			});
		}
	}

	render() {
		const loginForm = (
			<div className='row'>
				<div className='col s12'>
					<div className='row'>
						<div className='input-field col s12'>
							<input placeholder='Placeholder' id='username' 
								   type='text' className='validate' name='username'
								   onKeyPress={this.handleKeyPress}
								   onChange={this.handleInputchange}
								   value={this.state.username} />
							<label htmlFor='username'>Username</label>
						</div>
					</div>
					<div className='row'>
						<div className='input-field col s12'>
							<input id='password' type='password' 
								   className='validate' name='password'
								   onKeyPress={this.handleKeyPress}
								   onChange={this.handleInputchange}
								   value={this.state.password} />
							<label htmlFor='password'>Password</label>
						</div>
					</div>
					<div>
						<button className='btn waves-effect waves-light indigo'
								onClick={this.handleLoginRequest}>LOG IN
							<i className='material-icons right'>send</i>
						</button>
					</div>
				</div>
			</div>
		);

		const signupForm = (
			<div className='row'>
				<div className='col s12'>
					<div className='row'>
						<div className='input-field col s12'>
							<input placeholder='Placeholder' id='username' 
								   type='text' className='validate' name='username'
								   onKeyPress={this.handleKeyPress}
								   onChange={this.handleInputchange}
								   value={this.state.username} />
							<label htmlFor='username'>Username</label>
						</div>
					</div>
					<div className='row'>
						<div className='input-field col s12'>
							<input id='password' type='password' 
								   className='validate' name='password'
								   onKeyPress={this.handleKeyPress}
								   onChange={this.handleInputchange}
								   value={this.state.password} />
							<label htmlFor='password'>Password</label>
						</div>
					</div>
					<div className='row'>
						<div className='input-field col s12'>
							<input id='password_confirmation' type='password' 
								   className='validate' name='password_confirmation'
								   onKeyPress={this.handleKeyPress}
								   onChange={this.handleInputchange}
								   value={this.state.password_confirmation} />
							<label htmlFor='password_confirmation'>Password Confirmation</label>
						</div>
					</div>
					<div className='row'>
						<div className='input-field col s12'>
							<input placeholder='Placeholder' id='email' 
								   type='email' className='validate' name='email'
								   onKeyPress={this.handleKeyPress}
								   onChange={this.handleInputchange}
								   value={this.state.email} />
							<label htmlFor='email'>E-Mail</label>
						</div>
					</div>
					<div>
						<button className='btn waves-effect waves-light indigo'
								onClick={this.handleSignupRequest}>SIGN UP
							<i className='material-icons right'>send</i>
						</button>
					</div>
				</div>
			</div>
		);

		return (
			<div className='container account-form-margin'>
				{this.props.requestType == 'login' ? loginForm : signupForm}
			</div>
		);
	}
}

AccountForm.propTypes = {
	requestType: window.PropTypes.string,
	loginRequest: window.PropTypes.func,
	signupRequest: window.PropTypes.func,
	signup: window.PropTypes.object,
	history: window.PropTypes.object
};

AccountForm.defaultProps = {
	requestType: 'login',
	loginRequest: () => { console.log('loginRequest() is not defined'); },
	signupRequest: () => { console.log('signupRequest() is not defined'); },
	signup: {},
	history: {}
};

export default AccountForm;
