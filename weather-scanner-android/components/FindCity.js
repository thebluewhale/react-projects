import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet, Text, View,
	Image, TextInput, AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getCityListdataRequest} from '../actions/citylistData';
import {getWeatherdataRequest} from '../actions/weatherData';
import {DEFAULT_STORAGE, SUWON, WEATHER_FINDCITY_API, WEATHER_API_KEY} from '../utils/config';

class FindCity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false
		};
		this.onSubmitEditing = this.onSubmitEditing.bind(this);
		this.handleSelectCity = this.handleSelectCity.bind(this);
	}

	handleSelectCity(cityID, cityName) {
		let storage = DEFAULT_STORAGE + ':location';
		let combinedKey = `${cityID}:${cityName};`;
		if(this.props.isFirst) {
			AsyncStorage.setItem(storage, combinedKey);
		} else {
			AsyncStorage.getItem(storage).then((item) => {
				AsyncStorage.setItem(storage, item + combinedKey);
			});
		}
		this.props.onFindCity(cityID, cityName);
	}

	onSubmitEditing(e) {
		let city = e.nativeEvent.text;
		let url = `${WEATHER_FINDCITY_API}q=${city}&appkey=${WEATHER_API_KEY}&lang=ko-kr`;
		this.props.getCityListdataRequest(url).then(() => {
			if(this.props.citylistData.status === 'SUCCESS') {
				Actions.selectcity({onSelectCity: this.handleSelectCity,
									cityList: this.props.citylistData.data});
			} else {
				Actions.errorpopup('데이터를 받아오지 못했습니다.');
			}
		});
	}

	render() {
		const noItemView = (
			<View>
				<Text style={styles.whiteText}>설정한 지역이 없습니다.</Text>
				<Text style={styles.whiteText}>최소한 하나의 지역을 선택해주세요.</Text>
				<TextInput style={styles.cityEntry}
						   returnKeyType='go'
						   onSubmitEditing={this.onSubmitEditing}>
				</TextInput>
			</View>
		);

		const errorView = (
			<View>
				<Text style={styles.whiteText}>적절하지 않은 도시입니다.</Text>
				<Text style={styles.whiteText}>도시 이름을 확인해주세요.</Text>
				<TextInput style={styles.cityEntry}
						   returnKeyType='go'
						   onSubmitEditing={this.onSubmitEditing}>
				</TextInput>
			</View>
		);

		return (
			<View style={styles.container}>
				{this.state.error ? errorView : noItemView}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		weatherData: state.weatherData,
		citylistData: state.citylistData
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getWeatherdataRequest: (url) => {
			return dispatch(getWeatherdataRequest(url));
		},
		getCityListdataRequest: (url) => {
			return dispatch(getCityListdataRequest(url));
		}
	}
}

FindCity.propTypes = {
	onFindCity: React.PropTypes.func,
	isFirst: React.PropTypes.bool
}

FindCity.defaultProps	 = {
	onFindCity: () => { console.log('onFindCity is not defined'); },
	isFirst: false
}

export default connect(mapStateToProps, mapDispatchToProps)(FindCity);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#37474f'
	},
	cityEntry: {
		width: 300
	},
	whiteText: {
		color: '#ffffff'
	}
});
