import React from 'react';
import Utils from '../utils/Utils';
import {Text, View, BackHandler, TouchableOpacity, TextInput} from 'react-native';
import {Header} from '../components';
import {Actions} from 'react-native-router-flux';
import {searchStyle} from '../styles';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.onBackKey = this.onBackKey.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSearchAll = this.handleSearchAll.bind(this);
		this.pushSelectionPage = this.pushSelectionPage.bind(this);
	}

	pushSelectionPage(category) {
		Actions.selection({category: category, onSearch: this.props.onSearch});
	}

	handleSearchAll() {
		this.props.onSearch('all');
		Actions.pop();
	}

	handleSearch(e) {
		let keyword = e.nativeEvent.text;
		this.props.onSearch('searching', keyword);
		Actions.pop();
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
			<View style={searchStyle.container}>
				<View style={searchStyle.header}>
					<Header showIcon={false}/>
				</View>
				<View style={searchStyle.list}>
					<TextInput style={searchStyle.searchInput}
							   onSubmitEditing={this.handleSearch}
							   placeholder='채용공고를 직접 검색해보세요'
							   returnKeyType='search'>
					</TextInput>
					<TouchableOpacity style={searchStyle.buttonStyle} onPress={this.handleSearchAll}>
						<Text style={searchStyle.buttonText}>전체 공고 보기</Text>
					</TouchableOpacity>
					<TouchableOpacity style={searchStyle.buttonStyle} onPress={() => { this.pushSelectionPage('TOP30'); }}>
						<Text style={searchStyle.buttonText}>15대 기업 골라보기</Text>
					</TouchableOpacity>
					<TouchableOpacity style={searchStyle.buttonStyle} onPress={() => { this.pushSelectionPage('IT'); }}>
						<Text style={searchStyle.buttonText}>IT 기업 골라보기</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

Search.propTypes = {
	onSearch: React.PropTypes.func
}

Search.defaultProps ={
	onSearch: () => { console.log('onSearch is not defined'); }
}

export default Search;
