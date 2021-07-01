import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {MovieClip} from 'components';

class MovieList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const mapToComponents = (data) => {
			if(data.length) {
				return data.map((movieclip, i) => {
					return (
						<MovieClip movieClipData={movieclip}
								   index={i}
								   key={i}
								   currentUser={this.props.currentUser}
								   isLoggedIn={this.props.isLoggedIn}
								   onDelete={this.props.onDelete}>
						</MovieClip>
					);
				});
			} else {
				return (
					<div className='guidetext container'>
						NO MOVIE CLIP YET
					</div>
				);
			}
		}

		return (
			<div className='movielist'>
				{mapToComponents(this.props.fileListData)}
			</div>
		);
	}
}

MovieList.propTypes = {
	fileListData: React.PropTypes.array,
	currentUser: React.PropTypes.string,
	isLoggedIn: React.PropTypes.bool,
	onDelete: React.PropTypes.func
};

MovieList.defaultProps = {
	fileListData: [],
	currentUser: '',
	isLoggedIn: false,
	onDelete: () => { console.log('onDelete is not defined'); }
};

export default MovieList;
