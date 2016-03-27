import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { clearGarbageComments } from '../actions'
import CommentBalloon from './CommentBalloon';

class CommentList extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    const intervalID = setInterval(() => {
      dispatch(clearGarbageComments());
    }, 100);
    this.setState({ intervalID });
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }
  render() {
    const { comments } = this.props;

    const balloons = comments.map((c) => {
      return <CommentBalloon key={c.id} comment={c} timeLeft={c.autoHiding ? 5000 : 0} self={c.self} />;
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
