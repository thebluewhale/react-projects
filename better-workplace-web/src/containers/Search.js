import React from 'react';
import {Authentication} from 'components';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Utils from '../utils/Utils';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchKeyword: ''
		};
		this.companyDB = {};
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(e) {
		e.preventDefault();
		browserHistory.push(`/home/${e.target.value}`);
	}

	handleKeyPress(e) {
		if(e.charCode == 13) {
			if(this.state.searchKeyword === '') {
				browserHistory.push(`/home/all`);
			} else {
				browserHistory.push(`/home/${this.state.searchKeyword}`);
			}
			this.setState({searchKeyword: ''});
		}
	}

	handleChange(e) {
		this.setState({searchKeyword: e.target.value});
	}

	componentDidMount() {
		$('#top30-selection').material_select();
		$('#it-selection').material_select();
		$('#top30-selection').change((e) => {
			this.handleSearch(e);
		});
		$('#it-selection').change((e) => {
			this.handleSearch(e);
		});
	}

	componentWillMount() {
		this.companyDB = new Utils().getCompanyDB();
	}

	render() {
		const searchInput = (
			<div>
				<input type='text' className='validate' onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
				<label htmlFor='text_search' className='pink-text text-darken-4'>채용공고를 직접 검색해보세요.</label>
			</div>
		);

		const mapToSelectOption = (companyDB, category) => {
			return Object.keys(companyDB).map((key, index) => {
				if(category === companyDB[key].category) {
					return (
						<option key={key} value={companyDB[key].name}>{companyDB[key].name}</option>
					);
				}
			});
		}

		return (
			<div className='container'>
				<div className='row'>
					<div className='input-field col s12'>
						{searchInput}
					</div>
					<div className='input-field col s12 m12 l12 pink-text text-darken-4'>
						<select id='top30-selection' defaultValue='guideText'>
							<option value='guideText' disabled>25대 기업 골라보기</option>
							{mapToSelectOption(this.companyDB, 'TOP30')}
						</select>
					</div>
					<div className='input-field col s12 m12 l12 pink-text text-darken-4'>
						<select id='it-selection' defaultValue='guideText'>
							<option value='guideText' disabled>IT회사 골라보기</option>
							{mapToSelectOption(this.companyDB, 'IT')}
						</select>
					</div>
				</div>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
