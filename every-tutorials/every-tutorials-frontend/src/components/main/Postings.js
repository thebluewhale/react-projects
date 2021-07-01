import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import './Postings.css';
import Configs from '../../utils/Configs';

class Postings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.handleReadPostingItem = this.handleReadPostingItem.bind(this);
		this.selectPostingBorderColor = this.selectPostingBorderColor.bind(this);
	}

	selectPostingBorderColor(category) {
		let color = Configs.getCategoryRGBColor(category);
		return {
			'border': `5px solid ${color}`
		};
	}

	handleReadPostingItem(postingId) {
		this.props.handleReadPostingItem(postingId);
	}

	render() {
		const populatePostings = (postings) => {
			return postings.map((posting, i) => {
				return (
					<div className='col l3 m6 s12 posting-container' key={posting._id} 
						 onClick={() => {this.handleReadPostingItem(posting._id)}}>
						<div className='card posting-hover'>
							<div style={this.selectPostingBorderColor(posting.category)}>
								<div className='card-content'>								
									<span className='card-title grey-text text-darken-1'>
										<b>{posting.title}</b>
									</span>
								</div>
								<div className='card-action grey-text text-darken-1'>
									<div><b>{posting.author}</b> posted <TimeAgo date={posting.created} live={true} /></div>
								</div>
							</div>
						</div>
					</div>
				);
			});
		};

		return (
			<div className='containter'>
				<div className='row'>
					{populatePostings(this.props.postingData)}
				</div>
			</div>
		);
	}
}

Postings.propTypes = {
	postingData: window.PropTypes.array,
	handleReadPostingItem: window.PropTypes.func
};

Postings.defaultProps = {
	postingData: [],
	handleReadPostingItem: () => { console.log('handleReadPostingItem is not defined'); }
};

export default Postings;
