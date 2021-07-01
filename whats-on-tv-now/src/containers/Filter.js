import React from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			channel: '',
			category: ''
		};
		this.channelOption = ['전체', '공중파', '종합편성', '케이블', '스카이라이프'];
		this.cableCategoryOption = [
			'전체', '드라마', '공공', '교양', '교육', '뉴스,경제', '다큐', '레저', '만화',
			'스포츠', '어린이',	'여성,패션', '연예,오락', '영화', '음악', '종교', '홈쇼핑'
		];
		this.skylifeCategoryOption = [
			'전체', '드라마', '공공', '교양', '뉴스,경제', '다큐', '레저', '만화', '스포츠',
			'어린이', '여성,패션', '연예,오락', '영화', '음악', '지역지상파', '홈쇼핑'
		];
		this.handleFilter = this.handleFilter.bind(this);
		this.handleChannelChange = this.handleChannelChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
	}

	handleFilter() {
		let channel = $('#channel_select').val();
		let category = $('#category_select').val();
		category = category ? category : '전체';
		let query = `filter?channel=${channel}&category=${category}`;
		browserHistory.push(`/list/${query}`);
	}

	componentDidMount() {
		$('#channel_select').material_select();
		$('#category_select').material_select();
		$('#channel_select').change((e) => {
			this.handleChannelChange(e);
		});
		$('#category_select').change((e) => {
			this.handleCategoryChange(e);
		});
	}

	componentDidUpdate() {
		$('#category_select').material_select();
	}

	handleChannelChange(e) {
		e.preventDefault();
		this.setState({channel: e.target.value});
	}

	handleCategoryChange(e) {
		e.preventDefault();
		this.setState({category: e.target.value});
		console.log('handleCategoryChange');
	}

	render() {
		const mapToSelectOption = (DB) => {
			return Object.keys(DB).map((key, index) => {
				return (
					<option key={DB[key]} value={DB[key]}>{DB[key]}</option>
				);
			});
		};

		const disabledCategorySelection = () => {
			return (
				<select id='category_select' disabled>
					<option value='total' disabled>케이블/스카이라이프만 가능합니다.</option>
				</select>
			);
		};

		const cableCategorySelection = () => {
			return (
				<select id='category_select'>
					<option value='total' disabled>카테고리 선택</option>
					{mapToSelectOption(this.cableCategoryOption)}
				</select>
			);
		};

		const skylifeCategorySelection = () => {
			return (
				<select id='category_select'>
					<option value='total' disabled>카테고리 선택</option>
					{mapToSelectOption(this.skylifeCategoryOption)}
				</select>
			);
		};

		const populateCategorySelection = () => {
			if (this.state.channel == '케이블') {
				return cableCategorySelection();
			} else if (this.state.channel == '스카이라이프') {
				return skylifeCategorySelection();
			} else {
				return disabledCategorySelection();
			}
		};

		return (
			<div className='container'>
				<div className='row'>
					<div className='input-field col s12 m12 l12'>
						<select id='channel_select'>
							<option value='total' disabled>채널 선택</option>
							{mapToSelectOption(this.channelOption)}
						</select>
					</div>
					<div className='input-field col s12 m12 l12'>
						{populateCategorySelection()}
					</div>
					<div className='col s12 m6 l3' onClick={this.handleFilter}>
						<div className='card-panel center main-button pink lighten-5 black-text'>
							필터 적용
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Filter.propTypes = {
};

Filter.defaultProps = {
};


const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
