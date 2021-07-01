import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './BookmarkedPostings.css';
import Configs from '../../utils/Configs';

class BookmarkedPostings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookmarksData: []
		};
		this.selectPostingBorderColor = this.selectPostingBorderColor.bind(this);
		this.readBookmarkedPosting = this.readBookmarkedPosting.bind(this);
	}

	readBookmarkedPosting(postingID) {
		this.props.history.push(`/read/${postingID}`);
	}

	selectPostingBorderColor(category) {
		//let color = Configs.getCategoryRGBColor(category);
		return {
			//'border': `5px solid ${color}`
			'border': '5px solid yellow'
		};
	}

	componentDidMount() {
		this.props.handleAccountGetBookmarks().then(() => {
			if (this.props.bookmarksData.status === 'SUCCESS') {
				this.setState({bookmarksData: this.props.bookmarksData.data});
			} else {
				// get bookmark data failure
			}
		});
	}

	render() {
		const populateBookmarkedPostings = (postings) => {
			return postings.map((posting, i) => {
				if (i === 0) {
					return undefined;
				}
				return (
					<div className='card bookmarked-posting-contents' key={posting.postingID}
						 onClick={() => {this.readBookmarkedPosting(posting.postingID);}}>
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
			<div className='bookmarked-posting-container'>
				<div className='card blue-grey darken-4'>
					<div className='card-content white-text center'>
						<b>북마크 포스팅</b>
					</div>
				</div>
				{populateBookmarkedPostings(this.state.bookmarksData)}
			</div>
		);
	}
}

BookmarkedPostings.propTypes = {
};

BookmarkedPostings.defaultProps = {
};

export default BookmarkedPostings;
