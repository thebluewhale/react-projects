import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import TimeAgo from 'react-timeago';

class MovieClip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isInitial: true,
			playing: false
		};
		this.handlePlay = this.handlePlay.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		let deleteItemId = this.props.movieClipData._id;
		let itemIndex = this.props.index;
		this.props.onDelete(deleteItemId, itemIndex);
	}

	handlePlay() {
		if(this.state.playing) {
			this.setState({
				playing: false
			});
			let videoId = `#video${this.props.movieClipData._id}`;
			$(videoId).get(0).pause();
			$(`#playbutton${this.props.movieClipData._id}`).text('play_circle_outline');
		} else {
			let mainDivId = `#media${this.props.movieClipData._id}`;
			let videoUrl = `/videostreaming/${this.props.movieClipData.fileName}`;
			let videoId = `video${this.props.movieClipData._id}`;
			let videoElement = `<video id=${videoId} src=${videoUrl} autoplay no-controls/>`;
			if(this.state.isInitial) {
				$(mainDivId).append(videoElement);
				$(`#${videoId}`).width($(mainDivId).width()).height($(mainDivId).height());
				$(`#thumbnail${this.props.movieClipData._id}`).hide();
				this.setState({
					isInitial: false,
					playing: true
				});
			} else {
				$(`#${videoId}`).get(0).play();
				this.setState({
					playing: true
				});
			}
			$(`#playbutton${this.props.movieClipData._id}`).text('pause_circle_filled');
		}
	}

	componentDidMount() {
		$(`#dropdown-button-${this.props.movieClipData._id}`).dropdown({
            belowOrigin: true,
			constrain_width: false
        });

		$(`#media${this.props.movieClipData._id}`)
		.mouseenter(() => {
			if(this.state.playing){
				$(`#playbutton${this.props.movieClipData._id}`).text('pause_circle_filled');
			} else {
				$(`#playbutton${this.props.movieClipData._id}`).text('play_circle_filled');
			}
		}).mouseleave(() => {
			if(this.state.playing) {
				$(`#playbutton${this.props.movieClipData._id}`).text('');
			} else {
				$(`#playbutton${this.props.movieClipData._id}`).text('play_circle_outline');
			}
		});
	}

	componentWillUnmount() {
		this.setState({
			isInitial: true,
			playing: false
		});
	}

	render() {
		const {index, movieClipData, currentUser}  = this.props;

		const rename = (fileData) => {
			let owner = fileData.owner;
			let parts = fileData.fileName.split(owner + '_');
			if(parts.length === 1) {
				return fileData.fileName;
			} else {
				return parts.pop();
			}
		};

		const deleteButton = (
			<div className='deletebutton' onClick={this.handleDelete}>
				<a><i className='material-icons'>delete</i></a>
			</div>
		);

		const owner = (
			<span>
				<Link to={`/wall/${movieClipData.owner}`} className='owner'>
					{movieClipData.owner}
				</Link>
			</span>
		);

		return (
			<div className='movieclip container'>
				<div className='card'>
					<div className='card-content'>
						<div className='title'>
							{rename(movieClipData)}
						</div>
						<div>
							{owner} posted <TimeAgo date={movieClipData.created} live={true}/>
						</div>
						<div>
							{movieClipData.owner === currentUser ? deleteButton : undefined}
						</div>
						<div id={'media' + movieClipData._id} className='media' onClick={this.handlePlay}>
							<img id={'thumbnail' + movieClipData._id} className='thumbnail'
								 src={'/file/thumbnail/' + movieClipData.fileName}>
							 </img>
							 <i id={'playbutton' + movieClipData._id}
								className='white-text material-icons large playbutton'>
								play_circle_outline
							</i>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

MovieClip.propTypes = {
	movieClipData: React.PropTypes.object,
	currentUser: React.PropTypes.string,
	isLoggedIn: React.PropTypes.bool,
	index: React.PropTypes.number,
	onDelete: React.PropTypes.func
};

MovieClip.defaultProps = {
	movieClipData: {},
	currentUser: '',
	isLoggedIn: false,
	index: -1,
	onDelete: () => { console.log('onDelete is not defined'); }
};

export default MovieClip;
