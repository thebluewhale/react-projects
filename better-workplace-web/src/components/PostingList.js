import React from 'react';
import {Posting} from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Utils from '../utils/Utils';

class PostingList extends React.Component {
	constructor(props) {
		super(props);
		this.companyDB = {};
	}

	componentWillMount() {
		this.companyDB = new Utils().getCompanyDB();
	}

	render() {
		const mapToComponents = (data) => {
			return data.map((posting, i) => {
				return (
					<Posting data={posting}
							 key={posting._id}
						 	 index={i}
						  	 isLoggedIn={this.props.isLoggedIn}
						  	 onStar={this.props.onStar}
						  	 currentUser={this.props.currentUser}
							 companyDB={this.companyDB}>
					</Posting>
				);
			});
		}

		const emptyView = (
			<div className='card-panel red lighten-4'>
				<div className='posting-empty-text pink-text text-darken-4 center'>
					<div>
						현재 채용중인 공고가 없습니다.
					</div>
				</div>
			</div>
		);

		return (
			<div className='row posting-container'>
				<ReactCSSTransitionGroup transitionName='posting'
										 transitionEnterTimeout={500}
										 transitionLeaveTimeout={500}>
					{this.props.data.length ? mapToComponents(this.props.data) : emptyView}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

PostingList.propTypes = {
	data: React.PropTypes.array,
	currentUser: React.PropTypes.string,
	isLoggedIn: React.PropTypes.bool,
	onStar: React.PropTypes.func,
};

PostingList.defaultProps = {
	data: [],
	currentUser: '',
	isLoggedIn: false,
	onStar: (id, index) => { console.log('onStar function is not defined'); },
};

export default PostingList;
