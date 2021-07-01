import React from 'react';
import {Link} from 'react-router';

class SearchResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleChange(e) {
		let eValue = e.target.value;
		this.setState({
			keyword: eValue
		});
		if((eValue === '') || (eValue === 'undefined')) {
			return;
		} else {
			this.handleSearch(e.target.value);
		}
	}

	handleSearch(keyword) {
		this.props.onSearch(keyword);
	}

	render() {
		const mapResultsToLinks = (results) => {
			return results.map((result, i) => {
				return (
					<li key={i}>
						<Link to={'/chat/'+result.username}>{result.username}</Link>
					</li>
				);
			});
		}

		return (
			<div>
				<div className='card-content'>
					<div className='row'>
						<div className='input-field col s12 username'>
							<label>Username</label>
							<input type='text' name='username' className='validate'
								   onChange={this.handleChange} value={this.state.username}/>
						</div>
						<div>
							<ul>
								{mapResultsToLinks(this.props.resultDatas)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

SearchResult.propTypes = {
	onSearch: React.PropTypes.func,
	resultDatas: React.PropTypes.array
};

SearchResult.defaultProps = {
	onSearch: () => { console.log('onSearch is not defined'); },
	resultDatas: []
};

export default SearchResult;
