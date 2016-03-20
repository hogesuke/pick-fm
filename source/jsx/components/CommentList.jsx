import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import CommentBalloon from './CommentBalloon';

class CommentList extends Component {
  render() {
    const { comments } = this.props;

    const balloons = comments.map((c) => {
      return <CommentBalloon key={c.id} comment={c} timeLeft={5000} />;
    });

    return (
      <div id="comment-list" style={{ display: balloons.length > 0 ? 'block' : 'none' }}>
        {balloons}
      </div>
    );
  }
}

export default connect(state => {
  return {
    comments: state.pickApp.comments
  }
})(CommentList);
