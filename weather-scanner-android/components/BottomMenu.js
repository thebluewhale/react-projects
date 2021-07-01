import React, {Component} from 'react';
import {
	StyleSheet, Text, View, TouchableHighlight
} from 'react-native';

export default class BottomMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.hourlyViewClicked = this.hourlyViewClicked.bind(this);
		this.weeklyViewClicked = this.weeklyViewClicked.bind(this);
		this.airconditionsViewClicked = this.airconditionsViewClicked.bind(this);
		this.optionViewClicked = this.optionViewClicked.bind(this);
	}

	hourlyViewClicked() {
		this.props.onChangeViewMode('hourlyView');
	}

	weeklyViewClicked() {
		this.props.onChangeViewMode('weeklyView');
	}

	airconditionsViewClicked() {
		this.props.onChangeViewMode('airconditionsView');
	}

	optionViewClicked() {
		this.props.onChangeViewMode('optionView');
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight style={styles.buttonContainer}
									onPress={this.hourlyViewClicked}
									underlayColor='grey'>
					<Text>Hourly</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.buttonContainer}
									onPress={this.weeklyViewClicked}
									underlayColor='grey'>
					<Text>Weekly</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.buttonContainer}
									onPress={this.airconditionsViewClicked}
									underlayColor='grey'>
					<Text>Airconditions</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

BottomMenu.propTypes = {
	onChangeViewMode: React.PropTypes.func
}

BottomMenu.defaultProps	 = {
	onChangeViewMode: () => { console.log('onChangeViewMode is not defined'); }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'grey',
		padding: 3
	},
	buttonContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
