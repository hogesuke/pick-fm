import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { addComments, removeComment } from '../actions'

class CommentLineBlock extends Component {
  handleMounseOver() {
    const { dispatch, comments } = this.props;
    dispatch(addComments(comments, false));
  }
  handleMounseOut() {
    const { dispatch, comments } = this.props;
    _.each(comments, (c) => {
      dispatch(removeComment(c.id));
    });
  }
  render() {
    const { index, alpha } = this.props;
    return (
      <div
        className="block"
        style={{ left: `${index}%`, opacity: alpha }}
        onMouseOver={this.handleMounseOver.bind(this)}
        onMouseOut={this.handleMounseOut.bind(this)}
      >
      </div>
    );
  }
}

export default connect()(CommentLineBlock);
