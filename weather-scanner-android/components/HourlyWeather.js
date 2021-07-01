import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet, Text, View,
	Image, TextInput, AsyncStorage
} from 'react-native';

class HourlyWeather extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const makeHourlyView = (data) => {
			if(data.length) {
				let d = data[0];
				return (
					<View>
						<Text style={styles.whitefont}>현재 {this.props.cityName}의 날씨는</Text>
						<Text style={styles.whitefont}>기온 {d.Temperature.Metric.Value}도로</Text>
						<Text style={styles.whitefont}>{d.WeatherText} 입니다.</Text>
					</View>
				);
			}
		};

		return (
			<View>
				{makeHourlyView(this.props.data)}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		getData: state.weatherData
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HourlyWeather);

const styles = StyleSheet.create({
	whitefont: {
		color: 'white',
		fontSize: 20
	},
	bluefont: {
		color: 'blue',
		fontSize: 20
	}
});
