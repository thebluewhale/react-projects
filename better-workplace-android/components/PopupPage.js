import React from 'react';
import {View, Text, BackHandler, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {popupPageStyle} from '../styles';

class PopupPage extends React.Component {
    constructor(props){
        super (props);
		this.closeApp = this.closeApp.bind(this);
		this.onBackKey = this.onBackKey.bind(this);
    }

	onBackKey() {
		Actions.pop();
		return true;
	}

    closeApp() {
		Actions.pop();
		BackHandler.exitApp();
    }

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackKey);
    }

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackKey);
	}

    render() {
        return (
            <View style={popupPageStyle.container}>
                <View style={popupPageStyle.popup}>
					<View style={popupPageStyle.titleContainer}>
	                    <Text style={popupPageStyle.title}>{this.props.data}</Text>
					</View>
					<View style={popupPageStyle.buttonContainer}>
	                    <TouchableOpacity style={popupPageStyle.button} onPress={this.closeApp}>
							<Text style={popupPageStyle.buttonText}>종료</Text>
						</TouchableOpacity>
						<TouchableOpacity style={popupPageStyle.button} onPress={this.onBackKey}>
							<Text style={popupPageStyle.buttonText}>취소</Text>
						</TouchableOpacity>
					</View>
                </View>
            </View>
        );
    }
}

export default PopupPage;
