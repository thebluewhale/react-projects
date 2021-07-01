import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './ContentsLeftbar.css';

class ContentsLeftbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='leftbar-background'>
                this is ContentsLeftbar component
			</div>
		);
	}
}

ContentsLeftbar.propTypes = {
};

ContentsLeftbar.defaultProps = {
};

export default ContentsLeftbar;
