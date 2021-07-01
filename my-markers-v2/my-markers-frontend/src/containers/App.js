import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Preloader } from '../components';
import './App.css' ;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			preloader: false
		};
		this.clearSidenav = this.clearSidenav.bind(this);
		this.setPreloaderState = this.setPreloaderState.bind(this);
	}

	setPreloaderState(state) {
		if (typeof state !== 'boolean') {
			state = false;
		}
		if (this.state.preloader === state) {
			let _this = this;
			setTimeout(() => {
				_this.setState({preloader: state});
			}, 2000);
		}
		this.setState({preloader: state});
	}

	clearSidenav() {
		let sidenav_elem = document.querySelector('.sidenav');
		let ins = window.M.Sidenav.getInstance(sidenav_elem);
		ins.close();
	}

	componentDidMount() {
		const getCookie = (key) => {
			let value = ';' + document.cookie;
			let parts = value.split(';' + key + '=');
			if (parts.length == 2) {
				return parts.pop().split(';').shift();
			}
		}

		let access_token = getCookie('access_token');
		if (access_token) {
			this.setState({preloader: true});
			this.props.checkTokenRequest(access_token).then(() => {
				this.setState({preloader: false});
				if (!this.props.session.isLoggedIn) {
					document.cookie = '';
				}
			});
		}
	}

	render() {
		const welcomeGuide = (
			<div className='container styled-font center'>
				<h5>
					{'<베타서비스중입니다>'}
				</h5>
				<h5>
					이제 이곳에서<br/>
					맛집, 장소를 저장하세요.
					<br/><br/>
					막상 놀러가려면<br/>
					생각 안나는 목적지,<br/>
					이제 그때그때 저장하고<br/>
					지도로 한눈에 볼 수 있어요
				</h5>
			</div>
		);

		return (
			<div>
				{this.state.preloader ? <Preloader /> : null}
				{welcomeGuide}
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
