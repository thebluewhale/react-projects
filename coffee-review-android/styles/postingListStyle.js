import {StyleSheet} from 'react-native';

const postingListStyle = StyleSheet.create({
	list: {
		width: '100%'
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	},
	posting: {
		flex: 1,
		width: '90%',
		height: '90%',
		justifyContent: 'center',
		borderRadius: 2,
		marginTop: 5,
		marginRight: 10,
		marginBottom: 5,
		marginLeft: 10,
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: '#ffcdd2'
	},
	companyName: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#88024f',
		paddingTop: 10,
		paddingRight: 20,
		paddingLeft: 20
	},
	title: {
		fontSize: 18,
		paddingTop: 7,
		paddingRight: 20,
		paddingBottom: 7,
		paddingLeft: 20
	},
	footer: {
		paddingTop: 5,
		paddingRight: 20,
		paddingBottom: 5,
		paddingLeft: 20,
		borderTopWidth: 1,
		borderTopColor: '#e8eaf6'
	}
});


export default postingListStyle;
