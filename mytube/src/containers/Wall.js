import React from 'react';
import {Home} from 'containers';

class Wall extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Home wall={this.props.params.wall}/>
			</div>
		);
	}
}

export default Wall;
