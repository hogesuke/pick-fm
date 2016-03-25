import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

class CommentButton extends Component {
  componentWillMount() {
  }
  componentWillUpdate(nextProps) {
  }
  render() {
    return (
      <div className="comment-button">
        <div><i class="fa fa-heart"></i></div>
        <input type="text" />
      </div>
    );
  }
}

export default connect()(CommentButton);
