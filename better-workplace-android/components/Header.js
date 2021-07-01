import React from 'react';
import {connect} from 'react-redux';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {headerStyle} from '../styles';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.noticePopup = this.noticePopup.bind(this);
		this.helpClicked = this.helpClicked.bind(this);
		this.searchClicked = this.searchClicked.bind(this);
	}

	searchClicked() {
		this.props.onHeaderSearchClicked();
	}

	helpClicked() {
		let helpLink = 'http://www.betterworkplace.net/help';
		Actions.webpage({link: helpLink});
	}

	noticePopup() {
	}

	render() {
		const helpIcon = (
			<TouchableOpacity style={headerStyle.helpContainer} onPress={this.helpClicked}>
				<Image source={require('../resources/images/ic_info_outline.png')}
					   style={headerStyle.helpImage}/>
			</TouchableOpacity>
		);

		const searchIcon = (
			<TouchableOpacity style={headerStyle.authenticationContainer} onPress={this.searchClicked}>
				<Image source={require('../resources/images/ic_search.png')}
					   style={headerStyle.authentication}/>
			</TouchableOpacity>
		);

		const emptyIcon = (
			<View style={headerStyle.emptyContainer}/>
		);

		return (
			<View style={headerStyle.container}>
				{/*this.props.showIcon ? helpIcon : */emptyIcon}
				<View style={headerStyle.logoContainer}>
					<Text style={headerStyle.logo}>Better Workplace</Text>
				</View>
				{this.props.showIcon ? searchIcon: emptyIcon}
			</View>
		);
	}
}

Header.propTypes = {
};

Header.defaultProps = {
};

export default Header;
