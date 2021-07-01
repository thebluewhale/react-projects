import React from 'react';
import Utils from '../utils/Utils';
import {Text, View, BackHandler, TouchableOpacity, ListView, TextInput} from 'react-native';
import {Header} from '../components';
import {Actions} from 'react-native-router-flux';
import {selectionStyle} from '../styles';

class Search extends React.Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([])
		};
		this.onSelectCompany = this.onSelectCompany.bind(this);
		this.onBackKey = this.onBackKey.bind(this);
		this.renderRow = this.renderRow.bind(this);
	}

	onBackKey() {
		Actions.pop();
		return true;
	}

	onSelectCompany(keyword) {
		if(keyword === 'all') {
			this.props.onSearch('all');
		} else {
			this.props.onSearch('searching', keyword);
		}
		Actions.popTo('home');
	}

	renderRow(rowData) {
		return (
				<TouchableOpacity style={selectionStyle.listItem} onPress={() => {this.onSelectCompany(rowData.name);}}>
					<Text style={selectionStyle.listItemText}>{rowData.name}</Text>
				</TouchableOpacity>
		);
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackKey);
		let listData = [];
		let wholeData = new Utils().getCompanyDB();
		for(let company in wholeData) {
			if(wholeData[company].category === this.props.category) {
				listData.push(wholeData[company]);
			}
		}
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(listData)
		});
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackKey);
	}

	render() {
		return (
			<View style={selectionStyle.container}>
				<View style={selectionStyle.header}>
					<Header showIcon={false}/>
				</View>
				<View  style={selectionStyle.list}>
					<ListView dataSource={this.state.dataSource}
							  renderRow={this.renderRow}
							  enableEmptySections={true}
							  style={selectionStyle.listView}/>
				</View>
			</View>
		);
	}
}

Search.propTypes = {
	onSearch: React.PropTypes.func
}

Search.defaultProps ={
	onSearch: () => { console.log('onSearch is not defined'); }
}

export default Search;
