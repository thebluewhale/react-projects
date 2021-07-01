import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './TempPostings.css';
import Configs from '../../utils/Configs';

class TempPostings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tempPostingList: []
		};
		this.selectPostingBorderColor = this.selectPostingBorderColor.bind(this);
		this.handleEditTempPostingItem = this.handleEditTempPostingItem.bind(this);
	}

	handleEditTempPostingItem(postingId) {
		this.props.handleEditTempPostingItem(postingId);
	}

	selectPostingBorderColor(category) {
		let color = Configs.getCategoryRGBColor(category);
		return {
			'border': `5px solid ${color}`
		};
	}

	componentDidMount() {
		this.props.handleLoadTempPostings().then(() => {
			if (this.props.tempPostingList.status === 'SUCCESS') {
				this.setState({tempPostingList: this.props.tempPostingList.data});
			} else {
				// load temp postings failure
			}
		})
	}

	render() {
		const populateTempPostings = (postings) => {
			return postings.map((posting, i) => {
				return (
					<div className='card temp-posting-item' key={posting._id}
						 onClick={() => {this.handleEditTempPostingItem(posting._id)}}>
						<div style={this.selectPostingBorderColor(posting.category)}>
							<div className='card-content'>
								<span className='card-title'>{posting.title}</span>
							</div>
						</div>
					</div>
				);
			});
		};

		return (
			<div className='temp-posting-container'>
				<div className='card blue-grey darken-4'>
					<div className='card-content white-text center'>
						<b>작성중 포스팅</b>
					</div>
				</div>
				{populateTempPostings(this.state.tempPostingList)}
			</div>
		);
	}
}

TempPostings.propTypes = {
	tempPostingList: window.PropTypes.array,
	handleEditTempPostingItem: window.PropTypes.func
};

TempPostings.defaultProps = {
	tempPostingList: [],
	handleEditTempPostingItem: () => { console.log('handleEditTempPostingItem is not defined'); }
};

export default TempPostings;
