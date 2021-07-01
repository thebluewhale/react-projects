import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './AccountInfo.css';
import Configs from '../../utils/Configs';

class AccountInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='account-info-container'>
				<div className='card blue-grey darken-4'>
					<div className='card-content white-text center'>
						<b>계정 정보</b>
					</div>
				</div>
				<div className='card account-content'>
					<div>
						<div className='card-content'>
							<div className='card-title'>
								<p>USER NAME</p>
								<b>{this.props.session.currentUser}</b>
								<p>E-MAIL</p>
								<b>{this.props.session.email}</b>
								<p>CREATED</p>
								<b>{new Date(this.props.session.created).toLocaleString()}</b>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AccountInfo.propTypes = {
	session: window.PropTypes.object
};

AccountInfo.defaultProps = {
	session: {}
};

export default AccountInfo;
