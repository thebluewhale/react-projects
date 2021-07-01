import {StyleSheet} from 'react-native';

const homeStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5'
	},
	header: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	body: {
		flex: 9,
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center'
	}
});


export default homeStyle;
