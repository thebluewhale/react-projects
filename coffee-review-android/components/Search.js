import React from 'react';
import Utils from '../utils/Utils';
import {Text, View, BackHandler, TouchableOpacity, ListView} from 'react-native';
import {Header} from '../components';
import {Actions} from 'react-native-router-flux';
import {searchStyle} from '../styles';

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
		Actions.pop();
	}

	renderRow(rowData) {
		return (
				<TouchableOpacity style={searchStyle.listItem} onPress={() => {this.onSelectCompany(rowData.name);}}>
					<Text style={searchStyle.listItemText}>{rowData.name}</Text>
				</TouchableOpacity>
		);
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackKey);
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(new Utils().getCompanyDB())
		});
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackKey);
	}

	render() {
		return (
			<View style={searchStyle.container}>
				<View style={searchStyle.header}>
					<Header showIcon={false}/>
				</View>
				<View  style={searchStyle.list}>
					<View style={searchStyle.selectAll}>
						<TouchableOpacity onPress={() => {this.onSelectCompany('all');}}>
							<Text style={searchStyle.selectAllText}>전체 보기</Text>
						</TouchableOpacity>
					</View>
					<ListView dataSource={this.state.dataSource}
							  renderRow={this.renderRow}
							  enableEmptySections={true}
							  style={{width: '100%'}}/>
				</View>
			</View>
		);
	}
}

Search.propTypes = {
}

Search.defaultProps ={
}

export default Search;
