import React from 'react';
import {Link} from 'react-router';

class SearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentWillUnmount() {
		this.setState({
			keyword: ''
		});
	}

	handleChange(e) {
		let eValue = e.target.value;
		this.setState({
			keyword: eValue
		});
		if((eValue === '') || (eValue === 'undefined')) {
			return;
		} else {
			this.handleSearch(eValue);
		}
	}

	handleSearch(keyword) {
		this.props.onSearch(keyword);
	}

	render() {
		const mapToComponents = (data) => {
			if(data.length === 0) {
				return (<div className='guidetext'>NO MATCHED USER</div>);
			}
			return data.map((result, i) => {
				return (
					<li className='collection-item list' key={i}>
						<Link className='list-item' to={'/wall/' + result.username}>
							{result.username}
						</Link>
					</li>
				);
			});
		}

		const listView = (
			<ul className='collection'>
				{mapToComponents(this.props.searchUserData)}
			</ul>
		);

		const resultView = (
				(this.state.keyword === '') ?
					(<div className='guidetext'>SEARCH USER</div>) : (listView)
		);

		return (
			<div className='container searchuser'>
				<div className='card-content'>
					<div className='row'>
						<div className='input-field col s12'>
							<label htmlFor='searchInput'>SEARCH USERNAME</label>
							<input id='searchInput' type='text' className='validate'
								   onChange={this.handleChange} value={this.state.keyword}/>
						</div>
					</div>
				</div>
				<div>
					{resultView}
				</div>
			</div>
		);
	}
}

SearchPage.propTypes = {
	onSearch: React.PropTypes.func,
	searchUserData: React.PropTypes.array
};

SearchPage.defaultProps = {
	onSearch: () => { console.log('onSearch is not defined'); },
	searchUserData: []
};

export default SearchPage;
