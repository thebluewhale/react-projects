import React from 'react';

export default class ContactCreate extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleChange(e) {
		let eachInput = {};
		eachInput[e.target.name] = e.target.value;
		this.setState(eachInput);
	}

	handleClick() {
		if(this.state.name == '' || this.state.phone == '') {
			this.errorMessage.innerHTML = "name and phone are required";
			return;
		}

		const contact = {
			name: this.state.name,
			phone: this.state.phone
		};

		this.props.onCreate(contact);

		this.setState({
			name: '',
			phone: ''
		});

		this.errorMessage.innerHTML = "";
		this.nameInput.focus();
	}

	handleKeyPress(e) {
		if(e.charCode === 13) {
			this.handleClick();
		}
	}

	render() {
		return (
			<div className='w3-container w3-card-4 w3-light-grey'>
				<h2><b>Create Contact</b></h2>
				<label className='w3-label w3-text-dark-grey'>Name</label>
				<input className='w3-input' type="text" name="name"
					   value={this.state.name}
					   onChange={this.handleChange}
					   onKeyPress={this.handleKeyPress}
					   ref={(ref)=>{this.nameInput = ref;}}/>
				<label className='w3-label w3-text-dark-grey'>Phone</label>
				<input className='w3-input' type="text" name="phone"
					   value={this.state.phone}
					   onChange={this.handleChange}
					   onKeyPress={this.handleKeyPress}/>
				<p ref={(ref)=>{this.errorMessage = ref;}}></p>
				<div className='w3-section'>
					<button className='w3-btn w3-grey w3-border w3-round-large' onClick={this.handleClick}>Create</button>
				</div>
			</div>
		)
	}
}

ContactCreate.propTypes = {
	onCreate: React.PropTypes.func
}

ContactCreate.defaultProps = {
	onCreate: () => {console.error('ContactCreate.onCreate() is not defined');}
}
