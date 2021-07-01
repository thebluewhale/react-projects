import React from 'react';
import {connect} from 'react-redux';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {headerStyle} from '../styles';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.searchClicked = this.searchClicked.bind(this);
	}

	searchClicked() {
		this.props.onHeaderSearchClicked();
	}

	render() {
		const searchIcon = (
			<TouchableOpacity style={headerStyle.authenticationContainer} onPress={this.searchClicked}>
			</TouchableOpacity>
		);

		const emptyIcon = (
			<View style={headerStyle.emptyContainer}/>
		);

		return (
			<View style={headerStyle.container}>
				{emptyIcon}
				<View style={headerStyle.logoContainer}>
					<Text>Coffee Review</Text>
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
