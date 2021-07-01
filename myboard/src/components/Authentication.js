import React from 'react';
import {Link} from 'react-router';
import {Header} from 'components';

class Authentication extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			email: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleChange(e) {
		let eachInput = {};
		eachInput[e.target.name] = e.target.value;
		this.setState(eachInput);
	}

	handleKeyPress(e) {
		if(e.charCode == 13) {
			if(this.props.mode) {
				this.handleLogin();
			} else {
				this.handleRegister();
			}
		}
	}

	handleLogin() {
		let id = this.state.username;
		let pw = this.state.password;

		this.props.onLogin(id, pw).then(
			(success) => {
				if(!success) {
					this.setState({
						password: ''
					});
				}
			}
		);
	}

	handleRegister() {
		let id = this.state.username;
		let pw = this.state.password;
		let email = this.state.email;

		this.props.onRegister(id, pw, email).then(
			(result) => {
				if(!result) {
					this.setState({
						username: '',
						password: '',
						email: ''
					});
				}
			}
		);
	}

	render() {

		const loginView = (
			<div>
				<div className='card-content'>
					<div className='row'>
						<div className='input-field col s12 username'>
							<label htmlFor='username'>Username</label>
							<input id='username' type='text' name='username' className='validate'
								   onChange={this.handleChange} value={this.state.username}/>
						</div>
						<div className='input-field col s12'>
							<label htmlFor='password'>Password</label>
							<input id='password' type='password' name='password' className='validate'
								   onChange={this.handleChange} value={this.state.password} onKeyPress={this.handleKeyPress}/>
						</div>
					</div>
					<a className='deep-purple lighten-2 btn' onClick={this.handleLogin}>SUBMIT</a>
				</div>

				<div className='footer'>
					<div className='card-content'>
						<div className='right'>
							New Here? <Link className='purple-text' to='/register'>Create an account</Link>
						</div>
					</div>
				</div>
			</div>
		);

		const registerView = (
			<div>
				<div className='card-content'>
					<div className='row'>
						<div className='input-field col s12 username'>
							<label htmlFor='username'>Username</label>
							<input id='username' type='text' name='username' className='validate'
								   onChange={this.handleChange} value={this.state.username}/>
						</div>
						<div className='input-field col s12'>
							<label htmlFor='password'>Password</label>
							<input id='password' type='password' name='password' className='validate'
								   onChange={this.handleChange} value={this.state.password} onKeyPress={this.handleKeyPress}/>
						</div>
						<div className='input-field col s12'>
							<label htmlFor='email'>E-mail</label>
							<input id='email' type='text' name='email' className='validate'
								   onChange={this.handleChange} value={this.state.email} onKeyPress={this.handleKeyPress}/>
						</div>
					</div>
					<a className='deep-purple lighten-2 btn' onClick={this.handleRegister}>CREATE</a>
				</div>
			</div>
		);

		return (
			<div>
				<Header isAuthPage={true}></Header>
				<div className='container auth'>
					<div className='card'>
						<div className='header deep-purple white-text center'>
							<div className='card-content'>{this.props.mode ? 'LOGIN' : 'REGISTER'}</div>
						</div>
						{this.props.mode ? loginView : registerView}
					</div>
				</div>
			</div>
		);
	}
}

Authentication.propTypes = {
	mode: React.PropTypes.bool,
	onLogin: React.PropTypes.func,
	onRegister: React.PropTypes.func
};

Authentication.defaultProps = {
	mode: true,
	onLogin: (id, pw) => { console.log('onLogin function is not defined'); },
	onRegister: (id, pw) => { console.log('onRegister function is not defined'); }
};

export default Authentication;
