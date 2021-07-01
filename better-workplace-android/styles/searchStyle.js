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
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'column'
	},
	buttonText: {
		fontSize: 18,
		textAlign: 'center'
	},
	searchInput: {
		width: '80%',
		height: 70
	},
	buttonStyle: {
		width: '80%',
		height: 70,
		justifyContent: 'center',
		borderRadius: 2,
		marginTop: 5,
		marginRight: 10,
		marginBottom: 5,
		marginLeft: 10,
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: '#ffcdd2'
	}
});

export default searchStyle;
