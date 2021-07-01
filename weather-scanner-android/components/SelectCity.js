import React, {Component} from 'react';
import {
	StyleSheet, Text, View, ListView, TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';

class SelectCity extends Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([])
		};
		this.renderRow = this.renderRow.bind(this);
		this.renderHeader = this.renderHeader.bind(this);
		this.onSelectCity = this.onSelectCity.bind(this);
	}

	onSelectCity(cityID, cityName) {
		this.props.onSelectCity(cityID, cityName);
		Actions.popTo('mainpage');
	}

	renderHeader() {
		return (
			<View style={styles.listHeader}>
				<Text style={styles.whiteText}>도시를 선택하세요.</Text>
			</View>
		);
	}

	renderRow(rowData) {
		let {Key: key, LocalizedName: cityName} = rowData,
			country = rowData.Country.LocalizedName,
			administrativeArea = rowData.AdministrativeArea.LocalizedName;
		return (
			<TouchableHighlight onPress={() => this.onSelectCity(key, cityName)}
								underlayColor='grey'>
				<View style={styles.listItem}>
					<Text style={styles.whiteText}>{cityName}</Text>
					<Text style={styles.whiteText}>{country} {administrativeArea}</Text>
				</View>
			</TouchableHighlight>
		);
	}

	componentDidMount() {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.props.cityList)
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView style={styles.list}
						  dataSource={this.state.dataSource}
						  renderHeader={this.renderHeader}
						  renderRow={this.renderRow}
						  enableEmptySections={true}/>
			</View>
		);
	}
}

SelectCity.propTypes = {
	cityList: React.PropTypes.array,
	onSelectCity: React.PropTypes.func
}

SelectCity.defaultProps	 = {
	cityList: [],
	onSelectCity: () => { console.log('onSelectCity is not defined'); }
}

export default SelectCity;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#37474f'
	},
	list: {
		width: '100%'
	},
	listHeader: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		borderBottomWidth: 1,
		borderBottomColor: 'white'
	},
	listItem: {
		flex: 1,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255, 255, 255, 0.3)'
	},
	whiteText: {
		color: '#ffffff',
		fontSize: 20
	}
});
