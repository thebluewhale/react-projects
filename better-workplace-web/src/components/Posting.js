import React from 'react';
import {Link} from 'react-router';
import Utils from '../utils/Utils';

class Posting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expired: false
		};
		this.handleStar = this.handleStar.bind(this);
		this.handleTitleClick = this.handleTitleClick.bind(this);
		this.handleCompanyClick = this.handleCompanyClick.bind(this);
		this.makeBackgroundImg = this.makeBackgroundImg.bind(this);
	}

	handleCompanyClick(company) {
		let url = new Utils().getUrl(company);
		window.open(url);
	}

	handleTitleClick(link) {
		window.open(link);
	}

	handleStar() {
		/*
		let id = this.props.data._id;
		let index = this.props.index;
		this.props.onStar(id, index);
		*/
	}

	makeBackgroundImg(companyName) {
		return {
			'position' : 'absolute',
			'top' : '0px',
			'right' : '0px',
			'width' : '30%',
			'height' : '30%',
			'backgroundImage' : 'url(' + this.props.companyDB[companyName].imageURL + ')',
			'backgroundRepeat' : 'no-repeat',
			'backgroundSize': 'contain',
			'backgroundPosition' : 'center'
		};
	}

	componentDidMount() {
		let currentDate = new Date();
		let expireDate = new Date(this.props.data.expire);
		if((expireDate !== 'Invalid Date') && (currentDate > expireDate)) {
			this.setState({expired: true});
		}
	}

	render() {
		const starIcon = (
			<div>
				{/*}<i className='material-icons star'>star</i>*/}
			</div>
		);

		const jobGroupView = (
			(this.props.data.jobGroup === 'UNDEFINED' ? '-' : `${this.props.data.jobGroup}`)
		);

		const expireView = (
			(this.props.data.expire === 'UNDEFINED' ? '채용시까지' : `${this.props.data.expire}`)
		);

		const shadowDiv = (
			<div className='shadow'/>
		);

		const ciDiv = (
			<div style={this.makeBackgroundImg(this.props.data.company)}/>
		);

		return (
			<div className='container posting col s12 m6 l3'>
				<div className='card'>
					{this.state.expired ? shadowDiv : ciDiv}
					<div className='header'>
						<div className='company' onClick={() => {this.handleCompanyClick(this.props.data.company)}}>
							{this.props.companyDB[this.props.data.company].name}
						</div>
					</div>
					<div className='card-content title' onClick={() => {this.handleTitleClick(this.props.data.link)}}>
						<div>
							{this.props.data.title}
						</div>
					</div>
					<div className='footer'>
						<div>채용 직군 : {jobGroupView}</div>
						<div>접수 기한 : {expireView}</div>
					</div>
				</div>
			</div>
		)
	}
}

Posting.propTypes = {
	data: React.PropTypes.object,
	index: React.PropTypes.number,
	isLoggedIn: React.PropTypes.bool,
	onStar: React.PropTypes.func,
	currentUser: React.PropTypes.string,
	companyDB: React.PropTypes.object
}

Posting.defaultProps ={
	data: {},
	index: -1,
	isLoggedIn: false,
	onStar: () => { console.log('onStar is not defined'); },
	currentUser: '',
	companyDB: {}
}

export default Posting;
