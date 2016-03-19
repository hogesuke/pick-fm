import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

class CommentBalloon extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="balloon">
        {comment}
      </div>
    );
  }
}

export default connect()(CommentBalloon);
