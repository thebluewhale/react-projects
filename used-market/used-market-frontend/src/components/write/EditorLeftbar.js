import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './EditorLeftbar.css';

class EditorLeftbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='leftbar-background'>
                this is EditorLeftbar component
			</div>
		);
	}
}

EditorLeftbar.propTypes = {
};

EditorLeftbar.defaultProps = {
};

export default EditorLeftbar;
