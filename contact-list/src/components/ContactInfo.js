import React from 'react';

export default class ContactInfo extends React.Component {
	render () {
		return (
			<li className='w3-padding-16' onClick={this.props.onClick}>
				<span className='w3-xlarge'>{this.props.contact.name}</span>
				<br></br>
				<span>{this.props.contact.phone}</span>
			</li>
		)
	}
}
