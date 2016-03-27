import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { markRemoveComment, hideComment } from '../actions'

class CommentBalloon extends Component {
  componentWillMount() {
    const { dispatch, comment, timeLeft } = this.props;

    if (timeLeft > 0) {
      setTimeout(() => {
        dispatch(hideComment(comment.id));
      }, timeLeft);
    }
  }
  componentWillUpdate(nextProps) {
    const { dispatch, comment } = nextProps;
    const nextComment = nextProps.comment;
    const prevComment = this.props.comment;
    if (prevComment.hiding === false && nextComment.hiding === true) {
      // 300msec後にコメントを削除対象とする
      setTimeout(() => {
        dispatch(markRemoveComment(comment.id));
      }, 300);
    }
  }
  getClassName(comment) {
    const classes = ['balloon'];

    if (comment.hiding) {
      classes.push('hiding');
    }
    if (comment.self) {
      classes.push('self');
    }
    return classes.join(' ');
  }
  render() {
    const { comment } = this.props;
    return (
      <div className={ this.getClassName(comment) }>
        {comment.comment}
      </div>
    );
  }
}

export default connect()(CommentBalloon);
