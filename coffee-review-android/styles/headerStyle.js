import {StyleSheet} from 'react-native';

const headerStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f06292'
	},
	helpContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	helpImage: {
		height: '45%',
		width: '45%'
	},
	logoContainer: {
		flex: 4,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		height: '60%',
		width: '70%'
	},
	authenticationContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	authentication: {
		height: '45%',
		width: '45%'
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default headerStyle;
