import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getTimetableDataRequest, clearTimetableDataRequest} from '../actions/getTimetableData';
import {Program} from 'components';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scrollButtonState: false,
			loadingState: false
		};
		this.loadData = this.loadData.bind(this);
		this.loadMoreData = this.loadMoreData.bind(this);
		this.parseUrl = this.parseUrl.bind(this);
		this.scrollTop = this.scrollTop.bind(this);
	}

	loadData() {
		this.setState({loadingState: true});
		let channel = this.parseUrl('channel');
		let category = this.parseUrl('category');
		this.props.getTimetableDataRequest(true, undefined, channel, category).then(() => {
			this.setState({loadingState: false});
			if ($(window).height() < $(document).height()) {
				this.setState({scrollButtonState: true});
			}
		});
	}

	loadMoreData() {
		if (this.props.timetableData.isLast) {
			return new Promise((resolve, reject) => {
				resolve();
			});
		}

		this.setState({loadingState: true});
		let channel = this.parseUrl('channel');
		let category = this.parseUrl('category');
		let timetableData = this.props.timetableData;
		let lastObjId = timetableData.data[timetableData.data.length - 1]._id;
		this.props.getTimetableDataRequest(false, lastObjId, channel, category).then(() => {
			this.setState({loadingState: false});
		});

	}

	parseUrl(name) {
		let query = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
		let results = regex.exec(query);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	scrollTop() {
		$('html, body').animate({scrollTop: 0}, 'slow');
	}

	componentDidMount() {
		let channel = this.parseUrl('channel');
		let category = this.parseUrl('category');
		this.props.clearTimetableDataRequest();
		this.loadData();

		$(window).scroll(() => {
			if ($(document).height() - $(window).height() - $(window).scrollTop() < 25 ) {
				if (!this.state.loadingState) {
					this.loadMoreData();
				}
			}
		});
	}

	componentWillUnmount() {
		$(window).unbind();
	}

	render() {
		const scrollTopButton = (this.state.scrollButtonState) ?
			(
				<div className='fixed-action-btn'>
					<a className='btn-floating btn-large pink' onClick={this.scrollTop}>
						<i className='material-icons'>arrow_upward</i>
					</a>
				</div>
			) : (undefined);

		const loadMoreButton = (
			<div className='load-button center'>
				<div className='btn pink lighten-5 black-text' onClick={this.loadMoreData}>
					LOAD MORE DATA
				</div>
			</div>
		);

		const loadEndButton = (
			<div className='center'>
				<div className='btn pink lighten-5 disabled'>
					THIS IS LAST DATA
				</div>
			</div>
		);

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

		return (
			<div>
				{this.props.timetableData.data.length ?
					mapToComponents(this.props.timetableData.data) : undefined}
				{scrollTopButton}
			</div>
		);
	}
}

List.propTypes = {
};

List.defaultProps = {
};


const mapStateToProps = (state) => {
	return {
		timetableData: state.getTimetableData.timetable
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getTimetableDataRequest: (isInitial, lastObjId, channel, category) => {
			return dispatch(getTimetableDataRequest(isInitial, lastObjId, channel, category));
		},
		clearTimetableDataRequest: () => {
			return dispatch(clearTimetableDataRequest());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
