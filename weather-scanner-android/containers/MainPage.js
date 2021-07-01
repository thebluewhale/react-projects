import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet, Text, View,
	Image, TextInput, AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getWeatherdataRequest} from '../actions/weatherData';
import {getForecastdataRequest} from '../actions/forecastData';
import {
	BottomMenu,	HourlyWeather, WeeklyWeather, AirConditions, Settings, Header
} from '../components';
import {
	DEFAULT_STORAGE, WEATHER_API_KEY, WEATHER_CURRENT_API, WEATHER_FORECAST_API
} from '../utils/config';

class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewType: 'hourlyView',
			cityID: '',
			cityName: '',
			cityData: ''
		};
		this.getForecast = this.getForecast.bind(this);
		this.getWeather = this.getWeather.bind(this);
		this.handleFindCity = this.handleFindCity.bind(this);
		this.handleChangeViewMode = this.handleChangeViewMode.bind(this);
		this.getMainCity = this.getMainCity.bind(this);
	}

	getMainCity(item) {
		let first = item.split(';')[0];
		let mainCityID = first.split(':')[0],
			mainCityName = first.split(':')[1];
		return {
			cityID: mainCityID,
			cityName: mainCityName
		};
	}

	handleFindCity(cityID, cityName) {
		this.getWeather(cityID, cityName);
	}

	handleChangeViewMode(newViewType) {
		if(this.state.viewType === newViewType) {
			return;
		} else if(newViewType === 'hourlyView') {
			this.getWeather(this.state.cityID, '수원');
		} else if(newViewType === 'weeklyView') {
			this.getForecast(this.state.cityID);
		} else {

		}
		this.setState({viewType: newViewType});
	}

	getForecast(cityID) {
		let url = `${WEATHER_FORECAST_API}apikey=${WEATHER_API_KEY}&language=ko-kr&metric=true`;
		this.props.getForecastdataRequest(url).then(() => {
			if(this.props.forecastData.status === 'SUCCESS') {
			} else {
			}
		});
	}

	getWeather(cityID, cityName) {
		let url = `${WEATHER_CURRENT_API}apikey=${WEATHER_API_KEY}&language=ko-kr&metric=true`;
		this.props.getWeatherdataRequest(url);
		this.setState({
			cityID: cityID,
			cityName: cityName
		});
	}

	componentDidMount() {
		let storage = DEFAULT_STORAGE + ':location';
		AsyncStorage.getItem(storage).then((item) => {
			if(!item) {
				Actions.findcity({onFindCity: this.handleFindCity,
								  isFirst: true});
			} else {
				console.log('!!!!!!!!!!!!');
				console.log(item);
				let mainCity = this.getMainCity(item);
				this.getWeather(mainCity.cityID, mainCity.cityName);
				this.setState({
					cityID: mainCity.cityID,
					cityName: mainCity.cityName,
					cityData: item
				});
			}
		}).catch((error) => {
			Actions.errorpopup(error);
		});
	}



	render() {
		const hourlyView = (
			<HourlyWeather cityName={this.state.cityName}
						   data={this.props.weatherData}/>
		);

		const weeklyView = (
			<WeeklyWeather cityName={this.state.cityName}
						   data={this.props.forecastData}/>
		);

		const airconditionsView = (
			<AirConditions/>
		);

		const makeViewType = (viewType) => {
			if (viewType === 'hourlyView')
				return hourlyView;
			else if (viewType === 'weeklyView')
				return weeklyView;
			else
				return airconditionsView;
		};

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Header data={this.state.cityData}
							onFindCity={this.handleFindCity}/>
				</View>
				<View style={styles.body}>
					{makeViewType(this.state.viewType)}
				</View>
				<View style={styles.footer}>
					<BottomMenu onChangeViewMode={this.handleChangeViewMode}/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		weatherData: state.weatherData.data,
		forecastData: state.forecastData.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getWeatherdataRequest: (url) => {
			return dispatch(getWeatherdataRequest(url));
		},
		getForecastdataRequest: (url) => {
			return dispatch(getForecastdataRequest(url));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#37474f'
	},
	header: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'grey'
	},
	body: {
		flex: 7,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	footer: {
		flex: 2,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	}
});
