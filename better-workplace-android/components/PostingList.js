import React from 'react';
import {
	Text, View, ListView, TouchableOpacity, Image, ToastAndroid
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Utils from '../utils/Utils';
import {postingListStyle} from '../styles';

class PostingList extends React.Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([])
		};
		this.companyDB = null;
		this.renderRow = this.renderRow.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.setListViewItem = this.setListViewItem.bind(this);
		this.handleScrollEndReached = this.handleScrollEndReached.bind(this);
	}

	handleScrollEndReached() {
		if(this.props.isLast) {
			ToastAndroid.showWithGravity('마지막 포스팅입니다.',
				ToastAndroid.SHORT, ToastAndroid.CENTER);
		} else {
			this.props.loadMorePosting();
			ToastAndroid.showWithGravity('포스팅을 더 가져옵니다.',
				ToastAndroid.SHORT, ToastAndroid.CENTER);
		}
	}

	setListViewItem(modeChanged, keywordChanged) {
		setTimeout(() => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.props.data)
			});
		}, 1500);
		if(modeChanged || keywordChanged) {
			if(this.refs.listComponent) {
				let scrollResponder = this.refs.listComponent.getScrollResponder();
		    	scrollResponder.scrollResponderScrollTo({y: 0, animated: true});
			}
		}
	}

	handleClick(link) {
		Actions.webpage({link: link});
	}

	renderRow(rowData) {
		const makeJobGroupView = (data) => {
			return data === 'UNDEFINED' ? '-' : data;
		}

		const makeExpireView = (data)  => {
			return data === 'UNDEFINED' ? '채용시까지' : data;
		}

		return (
			<View style={postingListStyle.container}>
				<View style={postingListStyle.posting}>
					<TouchableOpacity onPress={() => {this.handleClick(rowData.link)}}>
						<Text style={postingListStyle.companyName}>{this.companyDB[rowData.company].name}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {this.handleClick(rowData.link)}}>
						<Text style={postingListStyle.title}>{rowData.title}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={postingListStyle.footer}
									  onPress={() => {this.handleClick(rowData.link)}}>
						<Text style={postingListStyle.footerText}>채용직군 : {makeJobGroupView(rowData.jobGroup)}</Text>
						<Text style={postingListStyle.footerText}>접수기한 : {makeExpireView(rowData.expire)}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	componentWillReceiveProps(nextProps) {
		if(!this.companyDB) {
			this.companyDB = new Utils().getCompanyDB();
		}
		let modeChanged = (this.props.mode === nextProps.mode) ? false : true;
		let keywordChanged = (this.props.keyword === nextProps.keyword) ? false : true;
		this.setListViewItem(modeChanged, keywordChanged);
	}

	render() {
		const emptyView = (
			<View style={postingListStyle.container}>
				<View style={postingListStyle.empty}>
					<Text>데이터가 존재하지 않습니다.</Text>
				</View>
			</View>
		);

		const listView = (
			<ListView dataSource={this.state.dataSource}
					  renderRow={this.renderRow}
					  enableEmptySections={true}
					  onEndReached={this.handleScrollEndReached}
					  ref='listComponent'/>
		);

		return (
			<View style={postingListStyle.list}>
				{this.props.data.length === 0 ? emptyView : listView}
			</View>
		);
	}
}

PostingList.propTypes = {
	data: React.PropTypes.array,
}

PostingList.defaultProps ={
	data: []
}

export default PostingList;
