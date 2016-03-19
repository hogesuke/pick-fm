import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { setComments, clearComments } from '../actions'

class CommentLineBlock extends Component {
  handleMounseOver() {
    const { dispatch, comments } = this.props;
    dispatch(setComments(comments));
  }
  handleMounseOut() {
    const { dispatch } = this.props;
    dispatch(clearComments());
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
