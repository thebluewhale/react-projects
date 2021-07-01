import React from 'react';
import { Header } from '../components';
import { MainView } from './index';
import { connect } from 'react-redux';
import './App.css' ;
import { accountGetInfoRequest, logoutRequest } from '../actions/account';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.logoutRequest = this.logoutRequest.bind(this);
		this.accountGetInfoRequest = this.accountGetInfoRequest.bind(this);
	}

	accountGetInfoRequest() {
		this.props.accountGetInfoRequest();
	}

	logoutRequest() {
		return this.props.logoutRequest();
	}

	componentDidMount() {
		this.accountGetInfoRequest();
	}

	render() {
		return (
			<div className='app-background blue-grey lighten-4'>
				<Header session={this.props.session}
						history={this.props.history}
						handleLogoutRequest={this.logoutRequest} />
				<MainView history={this.props.history}
						  match={this.props.match} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		session: state.account.session
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		accountGetInfoRequest: () => {
			return dispatch(accountGetInfoRequest());
		},
		logoutRequest: () => {
			return dispatch(logoutRequest());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
