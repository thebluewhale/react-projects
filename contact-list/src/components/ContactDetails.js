import React from 'react';

export default class ContactDetails extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			name: '',
			phone: ''
		};
		this.handleRemove = this.handleRemove.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleRemove() {
		this.props.onRemove(this.props.isSelected);
	}

	handleToggle() {
		if(!this.state.editMode) {
			this.setState({
				name: this.props.selectedData.name,
				phone: this.props.selectedData.phone
			});
		} else {
			this.handleEdit();
		}

		this.setState({
			editMode: !this.state.editMode
		});
	}

	handleChange(e) {
		let eachInput = {};
		eachInput[e.target.name] = e.target.value;
		this.setState(eachInput);
	}

	handleEdit() {
		this.props.onEdit(this.state.name, this.state.phone);
	}

	handleKeyPress(e) {
		if(e.charCode === 13) {
			this.handleToggle();
		}
	}

	render () {
		const detail = (
			<div>
				<h3>{this.props.selectedData.name}</h3>
				<h5>{this.props.selectedData.phone}</h5>
			</div>
		);

		const blank = (
			<div>no selected data</div>
		);

		const edit = (
			<div>
				<label className='w3-label w3-text-dark-grey'>Name</label>
				<input type="text" name="name"
					   className='w3-input'
					   value={this.state.name}
					   onChange={this.handleChange}/>
				<label className='w3-label w3-text-dark-grey'>Phone</label>
				<input type="text" name="phone"
					   className='w3-input'
					   value={this.state.phone}
					   onChange={this.handleChange}
					   onKeyPress={this.handleKeyPress}/>
			</div>
		);

		const view = this.state.editMode ? edit : detail;

		return (
			<div className='w3-container w3-card-4 w3-light-grey'>
				<h2><b>Details</b></h2>
				<div>{this.props.isSelected < 0 ? blank : view}</div>
				<div className='w3-section'>
					<button className='w3-btn w3-grey w3-border w3-round-large' onClick={this.handleRemove}>Remove</button>
					<button className='w3-btn w3-grey w3-border w3-round-large' onClick={this.handleToggle}>{this.state.editMode ? "OK" : "Edit"}</button>
				</div>
			</div>
		);
	}
}

ContactDetails.defaultProps = {
	selectedData: {
		name: '',
		phone: ''
	},
	onRemove: () => {console.error("ContactDetails.onRemove is not defined");},
	onEdit: () => {console.error("ContactDetails.onEdit is not defined");},
}

ContactDetails.propTypes = {
	selectedData: React.PropTypes.object,
	onRemove: React.PropTypes.func,
	onEdit: React.PropTypes.func
}
