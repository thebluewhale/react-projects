import React from 'react';
import {connect} from 'react-redux';
import {WebView, BackHandler} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Webpage extends React.Component {
	constructor(props) {
		super(props);
		this.onBackKey = this.onBackKey.bind(this);
	}

	onBackKey() {
		Actions.pop();
		return true;
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackKey);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackKey);
	}

	render() {
		return (
			<WebView source={{uri: this.props.link}}/>
		);
	}
}

Webpage.propTypes = {
	link: React.PropTypes.string
};

Webpage.defaultProps = {
	link: ''
};

export default Webpage;
