import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, BackHandler} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Header} from '../components';
import {homeStyle} from '../styles';
import SplashScreen from '@remobile/react-native-splashscreen';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.onSelectItem = this.onSelectItem.bind(this);
	}

	onSelectItem(selectedBrand) {
		Actions.brandview({selectedBrand: selectedBrand});
	}

	componentDidMount() {
		SplashScreen.hide();
	}

	render() {
		return (
			<View style={homeStyle.container}>
				<View style={homeStyle.header}>
					<Header showIcon={true}/>
				</View>
				<View style={homeStyle.body}>
					<View style={homeStyle.row}>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item1')}}>
								<Text>item1</Text>
							</TouchableOpacity>
						</View>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item2')}}>
								<Text>item2</Text>
							</TouchableOpacity>
						</View>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item3')}}>
								<Text>item3</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={homeStyle.row}>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item4')}}>
								<Text>item4</Text>
							</TouchableOpacity>
						</View>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item5')}}>
								<Text>item5</Text>
							</TouchableOpacity>
						</View>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item6')}}>
								<Text>item6</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={homeStyle.row}>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item7')}}>
								<Text>item7</Text>
							</TouchableOpacity>
						</View>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item8')}}>
								<Text>item8</Text>
							</TouchableOpacity>
						</View>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item9')}}>
								<Text>item9</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={homeStyle.row}>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item10')}}>
								<Text>item10</Text>
							</TouchableOpacity>
						</View>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item11')}}>
								<Text>item11</Text>
							</TouchableOpacity>
						</View>
						<View style={homeStyle.column}>
							<TouchableOpacity style={homeStyle.item} onPress={() => {this.onSelectItem('item12')}}>
								<Text>item12</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
