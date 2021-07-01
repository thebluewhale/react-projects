import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			passwordConfirm: '',
			email: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleChange(e) {
		let eachInput = {};
		eachInput[e.target.name] = e.target.value;
		this.setState(eachInput);
	}

	handleKeyPress(e) {
		if(e.charCode === 13) {
			this.handleLogin();
		}
	}

	handleRegister() {
		let username = this.state.username;
		let password = this.state.password;
		let passwordConfirm = this.state.passwordConfirm;
		let email = this.state.email;

		if(username === '') {
			Materialize.toast('USERNAME IS REQUIRED', 2000);
		} else if(password === '') {
			Materialize.toast('PASSWORD IS REQUIRED', 2000);
		} else if(passwordConfirm === '') {
			Materialize.toast('PASSWORD CONFIRM IS REQUIRED', 2000);
		} else if(email === '') {
			Materialize.toast('EMAIL IS REQUIRED', 2000);
		} else if(password !== passwordConfirm) {
			Materialize.toast('CHECK PASSWORD CONFIRM', 2000);
		} else {
			this.props.onRegister(username, password, email);
		}
	}

	render() {
		return (
			<div>
				<div className='card-content'>
					<div className='row'>
						<div className='input-field col s12 username'>
							<label>Username (Longer than 4 characters)</label>
							<input type='text' name='username' className='validate'
								   onChange={this.handleChange} value={this.state.username}
								   onKeyPress={this.handleKeyPress}/>
						</div>
						<div className='input-field col s12'>
							<label>Password (Longer than 4 characters)</label>
							<input type='password' name='password' className='validate'
								   onChange={this.handleChange} value={this.state.password}
								   onKeyPress={this.handleKeyPress}/>
						</div>
						<div className='input-field col s12'>
							<label>Password Confirm</label>
							<input type='password' name='passwordConfirm' className='validate'
								   onChange={this.handleChange} value={this.state.passwordConfirm}
								   onKeyPress={this.handleKeyPress}/>
						</div>
						<div className='input-field col s12'>
							<label>E-mail</label>
							<input type='text' name='email' className='validate'
								   onChange={this.handleChange} value={this.state.email}
								   onKeyPress={this.handleKeyPress}/>
						</div>
					</div>
					<a className='deep-purple lighten-2 btn' onClick={this.handleRegister}>CREATE</a>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	onRegister: React.PropTypes.func
};

Register.defaultProps = {
	onRegister: () => { console.log('onRegister is not defined'); }
};

export default Register;
