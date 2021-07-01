import React from 'react';
import {Header} from 'components';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Cookies from 'universal-cookie';
import {getStatusRequest, logoutRequest} from '../actions/authentication';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handlePopupClick = this.handlePopupClick.bind(this);
		this.checkPopupStatus = this.checkPopupStatus.bind(this);
	}

	checkPopupStatus() {
		let cookies = new Cookies();
		if(cookies.get('popupStatus') === 'noshow') {
			$('#alertPopup').remove();
		}
	}

	handlePopupClick(e) {
		if(e.target.name === 'noshow') {
			let cookies = new Cookies();
			let expDate = new Date();
			expDate.setTime(expDate.getTime() + (24 * 60 * 60 * 1000));
			cookies.set('popupStatus', 'noshow', {path: '/', expires: expDate});
		}
		$('#alertPopup').remove();
	}

	componentDidMount() {
		this.checkPopupStatus();
	}

	render() {
		let re = /(login|register)/;
		let isAuth = re.test(this.props.location.pathname);

		const alertPopup = (
			<div id='alertPopup' className='alert-popup'>
				<div className='container row center'>
					<div className='col s12 alert-popup-content'>
						<div className='card blue-grey darken-1'>
							<div className='card-content white-text'>
								<span className='card-title'>안내드립니다</span>
								<p className='pink-text text-lighten-2'>검색기능이 개선되었습니다.</p>
								<p className='pink-text text-lighten-2'>화면 우측 상단의 검색 버튼을 눌러서</p>
								<p className='pink-text text-lighten-2'>키워드 검색을 할 수 있으며,</p>
								<p className='pink-text text-lighten-2'>카테고리에서 회사를 선택하여 검색할 수 있습니다.</p>
								<p><br/></p>
								<p>* IE계열의 브라우저 및 일부 브라우저는 지원하지 않습니다. *</p>
								<p><br/></p>
								<p>BetterWorkplace는 정확한 정보 제공을 위해 노력하고 있으나,</p>
								<p>각 사의 채용 홈페이지의 정보와 상이할 수 있습니다.</p>
								<p><br/></p>
								<p>감사합니다.</p>
							</div>
							<div className='card-action'>
								<a name='noshow' onClick={this.handlePopupClick}>오늘 다시 보지 않기</a>
								<a name='justok' onClick={this.handlePopupClick}>팝업 닫기</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		)

		return (
			<div>
				{isAuth ? (undefined) : (<Header isLoggedIn={this.props.status.isLoggedIn} onLogout={this.handleLogout}/>)}
				{alertPopup}
				{this.props.children}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		status: state.authentication.status
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getStatusRequest: () => {
			return dispatch(getStatusRequest());
		},
		logoutRequest: () => {
			return dispatch(logoutRequest());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
