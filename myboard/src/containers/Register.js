import React from 'react';
import {Authentication} from 'components';
import {connect} from 'react-redux';
import {registerRequest} from '../actions/authentication';
import {browserHistory} from 'react-router';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleRegister(id, pw, email) {
		return this.props.registerRequest(id, pw, email).then(
			() => {
				if(this.props.status === 'SUCCESS') {
					Materialize.toast('Success. log in please', 2000);
					browserHistory.push('/login');
					return true;
				} else {
					let errorMessage = [
						'Invalid username',
						'Password is too short',
						'Invalid email',
						'Username is already exists'
					];

					Materialize.toast(errorMessage[this.props.errorcode-1], 2000);
					return false;
				}
			}
		);
	}

	render() {
		return (
			<div>
				<Authentication mode={false} onRegister={this.handleRegister}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		status: state.authentication.register.status,
		errorcode: state.authentication.register.error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerRequest: (id, pw, email) => {
			return dispatch(registerRequest(id, pw, email));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
