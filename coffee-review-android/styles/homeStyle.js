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
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		width: '100%'
	},
	column: {
		flex: 1,
		flexDirection: 'column',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'grey',
		borderWidth: 1,
		borderColor: '#dddddd'
	},
	item: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});


export default homeStyle;
