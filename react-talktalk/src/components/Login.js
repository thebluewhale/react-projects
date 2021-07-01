import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
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

	handleLogin() {
		let username = this.state.username;
		let password = this.state.password;
		this.props.onLogin(username, password);
	}

	render() {
		return (
			<div>
				<div className='card-content'>
					<div className='row'>
						<div className='input-field col s12 username'>
							<label>Username</label>
							<input type='text' name='username' className='validate'
								   onChange={this.handleChange} value={this.state.username}
								   onKeyPress={this.handleKeyPress}/>
						</div>
						<div className='input-field col s12'>
							<label>Password</label>
							<input type='password' name='password' className='validate'
								   onChange={this.handleChange} value={this.state.password}
								   onKeyPress={this.handleKeyPress}/>
						</div>
					</div>
					<a className='deep-purple lighten-2 btn' onClick={this.handleLogin}>LOGIN</a>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	onLogin: React.PropTypes.func
};

Login.defaultProps = {
	onLogin: () => { console.log('onLogin is not defined'); }
};

export default Login;
