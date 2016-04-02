import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../actions';
import _ from 'underscore';

class CommentButton extends Component {
  constructor(props) {
    super(props);
    this.state = { commentText: '', active: null, hasError: false };
  }
  handleMounseOver() {
    this.setState({ active: true });

    setTimeout(() => {
      const commentInput = this.refs.commentInput;
      const isShow = _.contains(commentInput.parentElement.classList, 'show');
      if (isShow) { commentInput.focus(); }
    }, 300);
  }
  handleMounseOut() {
    this.refs.commentInput.blur();
    this.setState({ active: false });
  }
  handlePostClick() {
    const { dispatch, playingEpisode, audioCurrentTime } = this.props;
    const comment = this.refs.commentInput.value;

    if (comment && comment.length > 32) {
      this.setState({ hasError: true });
      return;
    }
    if (!playingEpisode) { return; }
    dispatch(postComment(playingEpisode.id, comment, audioCurrentTime));

    this.refs.commentInput.value = '';
  }
  handleChange(e) {
    const { hasError } = this.state;
    const comment = e.target.value;

    this.setState({ commentText: comment });

    if (comment.length > 32) {
      this.setState({ hasError: true });
      return;
    }
    if (hasError && comment.length <= 32) {
      this.setState({ hasError: false });
    }
  }
  handleKeyDown(e) {
    const { hasError } = this.state;
    if (!hasError && e.keyCode ===   13) {
      this.handlePostClick();
      this.setState({ commentText: '' });
    }
  }
  render() {
    const { commentText, active, hasError } = this.state;

    return (
      <div id="comment-button-container">
        <div
          id="comment-button"
          onMouseOver={this.handleMounseOver.bind(this)}
          onMouseOut={this.handleMounseOut.bind(this)}
        >
          <button className="fav" onClick={this.handlePostClick.bind(this)}>
            <i className="fa fa-heart"></i>
          </button>
          <div className={ active === null ? 'comment-form' : (active ? 'comment-form show' : 'comment-form hide') }>
            <input
              ref="commentInput"
              type="text"
              value={commentText}
              className={ hasError ? 'error' : '' }
              placeholder="コメント（任意）"
              spellCheck="false"
              onChange={this.handleChange.bind(this)}
              onKeyDown={this.handleKeyDown.bind(this)}
            />
            <span className={ hasError ? 'count error' : 'count' }>{ 32 - commentText.length }</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingEpisode  : state.pickApp.playingEpisode,
    audioCurrentTime: state.pickApp.audioCurrentTime
  }
})(CommentButton);
