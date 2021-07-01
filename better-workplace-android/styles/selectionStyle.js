import {StyleSheet} from 'react-native';

const selectionStyle = StyleSheet.create({
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
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'column'
	},
	listView: {
		width: '100%'
	},
	listItemText: {
		fontSize: 18
	},
	listItem: {
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2,
		marginTop: 1,
		marginBottom: 1,
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: '#ffcdd2'
	}
});

export default selectionStyle;
