import React, {Component} from 'react';
import {
	StyleSheet, Text, View, TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cityData: [],
			initialized: false
		};
		this.extractCityData = this.extractCityData.bind(this);
		this.itemViewClicked = this.itemViewClicked.bind(this);
		this.emptyViewClicked = this.emptyViewClicked.bind(this);
	}

	itemViewClicked(index, cityID) {
		console.log(index, cityID);

	}

	emptyViewClicked(index) {
		if(index) {
			Actions.findcity({onFindCity: this.props.onFindCity,
							  isFirst: false});
		} else {
			Actions.findcity({onFindCity: this.props.onFindCity,
							  isFirst: true});
		}
	}

	extractCityData(fullData) {
		let splitedData = fullData.split(';'),
			tempArr = [];
		splitedData.splice(splitedData.length - 1);
		splitedData.map((data, i) => {
			tempArr.push(data);
		});
		//this.setState({cityData: tempArr});
		return tempArr;
	}

	render() {
		const emptyView = (index) => {
			return (
				<TouchableHighlight style={styles.listItem}
									onPress={() => this.emptyViewClicked(index)}
									underlayColor='grey'>
					<View>
						<Text style={styles.whiteText}>도시를 설정하세요</Text>
					</View>
				</TouchableHighlight>
			);
		};

		const itemView = (index, item) => {
			let splited = item.split(':');
			return (
				<TouchableHighlight style={styles.listItem}
									onPress={() => this.itemViewClicked(index, splited[0])}
									underlayColor='grey'>
					<View>
						<Text style={styles.whiteText}>{splited[1]}</Text>
					</View>
				</TouchableHighlight>
			)
		};

		const makeList = (index, item) => {
			let extracted = this.extractCityData(item);
			if(extracted[index] !== undefined) {
				return itemView(index, extracted[index]);
			} else {
				return emptyView(index);
			}
		};

		return (
			<View style={styles.container}>
				{makeList(0, this.props.data)}
				{makeList(1, this.props.data)}
				{makeList(2, this.props.data)}
			</View>
		);
	}
}

Header.propTypes = {
	data: React.PropTypes.string,
	onFindCity: React.PropTypes.func
}

Header.defaultProps	 = {
	data: '',
	onFindCity: () => {console.log('onFindCity is not defined');}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#37474f'
	},
	listItem: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.3)'
	},
	whiteText: {
		color: '#ffffff'
	}
});
