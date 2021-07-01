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
		backgroundColor: '#eceff1',
		borderWidth: 2,
		borderColor: '#b0bec5'
	},
	companyName: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#3f51b5',
		paddingTop: 10,
		paddingRight: 20,
		paddingLeft: 20,
		fontFamily: 'NanumGothicR'
	},
	title: {
		fontSize: 18,
		paddingTop: 7,
		paddingRight: 20,
		paddingBottom: 7,
		paddingLeft: 20,
		fontFamily: 'NanumGothicR'
	},
	footer: {
		paddingTop: 5,
		paddingRight: 20,
		paddingBottom: 5,
		paddingLeft: 20,
		borderTopWidth: 1,
		borderTopColor: '#cfd8dc'
	},
	footerText: {
		fontFamily: 'NanumGothicR'
	},
	empty: {
		flex: 1
	}
});


export default postingListStyle;
