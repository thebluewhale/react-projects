import React, {Component} from 'react';
import {
	StyleSheet, Text, View
} from 'react-native';

export default class WeeklyWeather extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const makeWeeklyForecast = (data) => {
			return data.map((daily, i) => {
				if ((i > 0) && (i < 6)) {
					return (
						<View key={i}>
							<Text>{daily.Date.split('T')[0]}</Text>
							<Text>{daily.Day.IconPhrase}</Text>
							<Text>{daily.Night.IconPhrase}</Text>
						</View>
					);
				}
			});
		};

		return (
			<View>
				<Text style={styles.whitefont}>{this.props.cityName}의 주간 날씨</Text>
				<View>
					{makeWeeklyForecast(this.props.data)}
				</View>
			</View>
		);
	}
}

WeeklyWeather.propTypes = {
	cityName: React.PropTypes.string,
	data: React.PropTypes.array
}

WeeklyWeather.defaultProps	 = {
	cityName: '',
	data: []
}

const styles = StyleSheet.create({
	whitefont: {
		color: 'white',
		fontSize: 20
	}
});
