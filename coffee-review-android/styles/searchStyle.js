import {StyleSheet} from 'react-native';

const searchStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	header: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	list: {
		flex: 9,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: '100%'
	},
	listItem: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		width: '100%',
		borderBottomWidth: 1,
		borderColor: 'pink'
	},
	selectAll: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		width: '100%',
		borderBottomWidth: 1,
		borderColor: 'pink'
	},
	listItemText: {
		fontSize: 18
	},
	selectAllText: {
		fontSize: 18
	}
});

export default searchStyle;
