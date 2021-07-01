import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, BackHandler} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Header, PostingList} from '../components';
import {getPostingDataRequest} from '../actions/getPostingData';
import {homeStyle} from '../styles';
import SplashScreen from '@remobile/react-native-splashscreen';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scrollButtonState: false,
			loadingState: false,
			mode: 'all',
			keyword: ''
		};
		this.loadMorePosting = this.loadMorePosting.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.onBackKey = this.onBackKey.bind(this);
		this.onHeaderSearchClicked = this.onHeaderSearchClicked.bind(this);
	}

	onHeaderSearchClicked() {
		Actions.search({onSearch: this.handleSearch});
	}

	handleSearch(mode, keyword) {
		if(mode === 'searching') {
			this.setState({
				mode: 'searching',
				keyword: keyword
			});
			this.props.getPostingDataRequest(true, undefined, keyword);
		} else {
			this.setState({
				mode: 'all',
				keyword: ''
			});
			this.props.getPostingDataRequest(true);
		}
	}

	loadMorePosting() {
		if(this.props.isLast || this.state.loadingState) {
			return;
		}

		let lastId = this.props.postingData[this.props.postingData.length - 1]._id;
		this.setState({loadingState: true});
		if(this.state.mode === 'all') {
			this.props.getPostingDataRequest(false, lastId).then(() => {
				this.setState({loadingState: false});
			});
		} else {
			this.props.getPostingDataRequest(false, lastId, this.state.keyword).then(() => {
				this.setState({loadingState: false});
			});
		}
	}

	onBackKey() {
		if(this.props.title === 'home') {
			Actions.popuppage('종료하시겠습니까');
			return true;
		}
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackKey);
		this.props.getPostingDataRequest(true).then(() => {
			SplashScreen.hide();
		});
		setTimeout(() => {
			SplashScreen.hide();
		}, 5000);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackKey);
	}

	render() {
		return (
			<View style={homeStyle.container}>
				<View style={homeStyle.header}>
					<Header onHeaderSearchClicked={this.onHeaderSearchClicked}
							showIcon={true}/>
				</View>
				<View style={homeStyle.body}>
					<PostingList data={this.props.postingData}
								 loadMorePosting={this.loadMorePosting}
								 keyword={this.state.keyword}
								 isLast={this.props.isLast}
								 mode={this.state.mode}/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		postingData: state.getPostingData.posting.data,
		isLast: state.getPostingData.posting.isLast
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPostingDataRequest: (isInitial, lastId, keyword) => {
			return dispatch(getPostingDataRequest(isInitial, lastId, keyword));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
