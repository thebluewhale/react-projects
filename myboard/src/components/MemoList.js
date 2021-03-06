import React from 'react';
import {Memo} from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MemoList extends React.Component {
	render() {
		const mapToComponents = (data) => {
			return data.map((memo, i) => {
				return (
					<Memo data={memo}
						  ownership={(memo.writer === this.props.currentUser)}
						  key={memo._id}
						  index={i}
						  isLoggedIn={this.props.isLoggedIn}
						  onEdit={this.props.onEdit}
						  onRemove={this.props.onRemove}
						  onStar={this.props.onStar}
						  onReplyPost={this.props.onReplyPost}
						  onReplyRemove={this.props.onReplyRemove}
						  currentUser={this.props.currentUser}>
					</Memo>
				);
			});
		}

		return (
			<div>
				<ReactCSSTransitionGroup transitionName='memo'
										 transitionEnterTimeout={500}
										 transitionLeaveTimeout={500}>
					{mapToComponents(this.props.data)}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

MemoList.propTypes = {
	data: React.PropTypes.array,
	currentUser: React.PropTypes.string,
	isLoggedIn: React.PropTypes.bool,
	onEdit: React.PropTypes.func,
	onRemove: React.PropTypes.func,
	onStar: React.PropTypes.func,
	onReplyPost: React.PropTypes.func,
	onReplyRemove: React.PropTypes.func,
};

MemoList.defaultProps = {
	data: [],
	currentUser: '',
	isLoggedIn: false,
	onEdit: (id, index, contents) => { console.log('onEdit function is not defined'); },
	onRemove: (id, index) => { console.log('onRemove function is not defined'); },
	onStar: (id, index) => { console.log('onStar function is not defined'); },
	onReplyPost: (id, index, contents) => { console.log('onReplyPost function is not defined'); },
	onReplyRemove: (id, parentIndex, replyIndex) => { console.log('onReplyRemove function is not defined'); }
};

export default MemoList;
