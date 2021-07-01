import {StyleSheet} from 'react-native';

const popupPageStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },
	popup: {
		width: 250,
		height: 250,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: '#f5f5f5',
		borderWidth: 1,
		borderColor: '#ef9a9a'
	},
	titleContainer: {
		flex: 3,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ef9a9a'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
        fontFamily: 'NanumGothicR'
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderRightColor: 'pink'
	},
	buttonText: {
		fontSize: 16,
        fontFamily: 'NanumGothicR'
	}
});


export default popupPageStyle;
