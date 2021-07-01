import React from 'react';
import {Home} from 'containers';

class Wall extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Home username={this.props.params.username}/>
			</div>
		);
	}
}

export default Wall;
