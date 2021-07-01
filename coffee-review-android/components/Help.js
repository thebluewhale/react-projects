import React from 'react';
import {connect} from 'react-redux';
import {vocPostingRequest} from '../actions/help';

class Help extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vocContents: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handlePost = this.handlePost.bind(this);
	}

	handleChange(e) {
		this.setState({
			vocContents: e.target.value
		});
	}

	handlePost() {
		let vocContents = this.state.vocContents;
		this.props.vocPostingRequest(vocContents).then(() => {
			Materialize.toast('접수되었습니다. 감사합니다', 2000);
			this.setState({vocContents:''});
		});
	}

	render() {
		const helpText = (
			<div className='card-panel red lighten-4'>
				<div className='help-text pink-text text-darken-4'>
					<div>
						추가를 원하는 회사가 있으면 아래에 입력해주세요.
					</div>
					<div>
						또한 개선을 원하는 점이 있다면 아래에 입력해주세요.
					</div>
					<div>
						여러분의 소중한 의견으로 계속 발전시켜 나가겠습니다.
					</div>
					<div>
						기타 문의사항 및 컨택은 struct.st.x@gmail.com으로 메일주세요.
					</div>
					<div>
						감사합니다.
					</div>
				</div>
			</div>
		);

		const vocForm = (
			<div className='card'>
				<div className='card-content'>
					<textarea className='materialize-textarea'
							  placeholder='200자까지 입력이 가능합니다.'
							  value={this.state.vocContents}
							  onChange={this.handleChange}>
					</textarea>
				</div>
				<div className='card-action'>
					<a className='pink-text text-darken-4' onClick={this.handlePost}>보내기</a>
				</div>
			</div>
		);

		return (
			<div className='container center'>
				{helpText}
				{vocForm}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		vocPostingRequest: (vocContents) => {
			return dispatch(vocPostingRequest(vocContents));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Help);
