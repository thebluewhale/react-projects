import React from 'react';

class MyInfoView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			existingPassword: '',
			newPassword: '',
			email: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSaveChange = this.handleSaveChange.bind(this);
		this.changeDateFormat = this.changeDateFormat.bind(this);
	}

	handleChange(e) {
		let eachInput = {};
		eachInput[e.target.name] = e.target.value;
		this.setState(eachInput);
	}

	handleKeyPress(e) {
		if(e.charCode === 13) {
			this.handleSaveChange();
		}
	}

	handleSaveChange() {
		let username = this.props.userInfoData.username;
		let ePassword = this.state.existingPassword;
		let nPassword = this.state.newPassword ? this.state.newPassword : this.state.existingPassword;
		let nEmail = this.state.email ? this.state.email : this.props.userInfoData.email;
		this.props.onHandleSaveChange(username, ePassword, nPassword, nEmail);
	}

	changeDateFormat(originDate) {
		if(typeof originDate !== 'string')
			return '';

		let year = originDate.substr(0, 4);
		let month = originDate.substr(5, 2);
		let date = originDate.substr(8, 2);
		return (year + '. ' + month + '. ' + date);
	}

	componentDidMount() {
		this.setState({
			email: this.props.userInfoData.email
		});
	}

	render() {
		const createdDate = this.changeDateFormat(this.props.userInfoData.created);

		return (
			<div>
				<div className='card-content'>
					<div className='row'>
						<div className='input-field col s12 username'>
							<div className='left'><b>Username</b> (Cannot be changed)</div>
							<input disabled type='text' name='username'
								   className='validate black-text' value={this.props.userInfoData.username}/>
						</div>
						<div className='input-field col s12'>
							<div className='left'><b>Existing Password</b> (Required)</div>
							<input type='password' name='existingPassword' className='validate'
								   onChange={this.handleChange} value={this.state.existingPassword}
								   onKeyPress={this.handleKeyPress}/>
						</div>
						<div className='input-field col s12'>
							<div className='left'><b>New Password</b> (Optional)</div>
							<input type='password' name='newPassword' className='validate'
								   onChange={this.handleChange} value={this.state.newPassword}
								   onKeyPress={this.handleKeyPress}/>
						</div>
						<div className='input-field col s12'>
							<div className='left'><b>New Email</b> (Optional)</div>
							<input type='text' name='email' className='validate'
								   onChange={this.handleChange} value={this.state.email}
								   onKeyPress={this.handleKeyPress}/>
						</div>
						<div className='input-field col s12 username'>
							<div className='left'><b>Sign In date</b> (Cannot be changed)</div>
							<input disabled type='text' name='username'
								   className='validate black-text' value={createdDate}/>
						</div>
					</div>
					<a className='deep-purple lighten-2 btn' onClick={this.handleSaveChange}>SAVE CHANGE</a>
				</div>
			</div>
		);
	}
}

MyInfoView.propTypes = {
	userInfoData: React.PropTypes.object,
	onHandleSaveChange: React.PropTypes.func
}

MyInfoView.defaultProps = {
	userInfoData: {},
	onHandleSaveChange: () => { console.log('onHandleSaveChange is not defined'); }
}

export default MyInfoView;
