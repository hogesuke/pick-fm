import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { removeComment } from '../actions'

class CommentBalloon extends Component {
  componentWillMount() {
    const { dispatch, comment, timeLeft } = this.props;

    setTimeout(() => {
      dispatch(removeComment(comment.id));
    }, timeLeft);
  }
  render() {
    const { comment } = this.props;
    return (
      <div className="balloon">
        {comment.comment}
      </div>
    );
  }
}

export default connect()(CommentBalloon);
