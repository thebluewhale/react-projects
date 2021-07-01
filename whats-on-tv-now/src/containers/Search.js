import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Program} from 'components';
import {searchTimetableDataRequest, clearTimetableDataRequest} from '../actions/getTimetableData';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchKeyword: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		e.preventDefault();
		this.setState({searchKeyword: e.target.value});
		if (e.target.value) {
			this.props.searchTimetableDataRequest(e.target.value);
		} else {
			this.props.clearTimetableDataRequest();
		}
	}

	componentDidMount() {
		this.props.clearTimetableDataRequest();
		$('#search_input').focus();
	}

	render() {
		const mapToComponents = (data) => {
			return data.map((program, i) => {
				return (
					<Program index={i}
							 data={program}
							 key={program._id}>
					</Program>
				);
			});
		}

		const searchInput = (
			<div>
				<input id='search_input' type='text'
					   className='validate'
					   onChange={this.handleChange}
					   value={this.state.searchKeyword}/>
				<label htmlFor='text_search' className='pink-text text-darken-4'>방송사나 프로그램을 검색해보세요</label>
			</div>
		);

		const noResultView = (
			<div className='center'>
				검색결과가 없습니다.
			</div>
		)

		return (
			<div className='container'>
				<div className='row'>
					<div className='input-field col s12 m12 l12'>
						{searchInput}
					</div>
					{this.props.timetableData.data.length ?
						mapToComponents(this.props.timetableData.data) : noResultView}
				</div>
			</div>
		);
	}
}

Search.propTypes = {
};

Search.defaultProps = {
};


const mapStateToProps = (state) => {
	return {
		timetableData: state.getTimetableData.timetable
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchTimetableDataRequest: (keyword) => {
			return dispatch(searchTimetableDataRequest(keyword));
		},
		clearTimetableDataRequest: () => {
			return dispatch(clearTimetableDataRequest());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
