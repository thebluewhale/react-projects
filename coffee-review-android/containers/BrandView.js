import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

class BrandView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Text>this is brand view</Text>
				<Text>{this.props.selectedBrand}</Text>
			</View>
		);
	}
}

BrandView.propTypes = {
	selectedBrand: React.PropTypes.string
};

BrandView.defaultProps = {
	selectedBrand: ''
};

export default BrandView;
