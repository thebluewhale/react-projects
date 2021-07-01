import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';

export default class Contact extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			keyword: '',
			selectedKey: -1,
			contactData: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	componentWillMount() {
		const contactData = localStorage.contactData;

		if(contactData) {
			this.setState({
				contactData: JSON.parse(contactData)
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
			localStorage.contactData = JSON.stringify(this.state.contactData);
		}
	}

	handleChange(e) {
		this.setState({
			keyword: e.target.value
		});
	}

	handleClick(key) {
		this.setState({
			selectedKey: key
		});
	}

	handleCreate(contact) {
		this.setState({
			contactData: update(this.state.contactData, {$push: [contact]})
		});
	}

	handleRemove() {
		if(this.state.selectedKey < 0) {
			return;
		}

		this.setState({
			contactData: update(this.state.contactData, {$splice: [[this.state.selectedKey, 1]]}),
			selectedKey: -1
		});
	}

	handleEdit(name, phone) {
		this.setState({
			contactData: update(this.state.contactData, {[this.state.selectedKey]: {
				name: {$set: name},
				phone: {$set: phone}
			}})
		});
	}

	render() {
		const mapToComponents = (data) => {
			data.sort();
			data = data.filter((contact) => {
				return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
			});
			return data.map((contact, i) => {
				return (<ContactInfo contact={contact} key={i} onClick={() => this.handleClick(i)}/>);
			});
		};

		return (
			<div className='s3-container w3-card contact-body w3-teal'>
				<div className='w3-container'>
					<h1 className='w3-indigo w3-center'><b>Contacts</b></h1>
				</div>
				<div className='w3-container common-margin'>
					<input className='w3-input'
						   name='keyword'
						   placeholder='Search'
						   value={this.state.keyword}
						   onChange={this.handleChange}/>
				</div>
				<div className='w3-container common-margin'>
					<ul className='w3-ul w3-card-4 w3-light-grey'>
						<div className='w3-container'>
							<h2><b>Contact List</b></h2>
						</div>
						{mapToComponents(this.state.contactData)}
					</ul>
				</div>
				<div className='w3-container common-margin'>
					<ContactDetails isSelected={this.state.selectedKey}
									selectedData={this.state.contactData[this.state.selectedKey]}
									onRemove={this.handleRemove}
									onEdit={this.handleEdit}/>
				</div>
				<div className='w3-container common-margin'>
					<ContactCreate onCreate={this.handleCreate}/>
				</div>
			</div>
		);
	}

}
