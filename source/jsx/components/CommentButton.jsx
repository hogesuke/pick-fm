import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../actions';
import _ from 'underscore';

class CommentButton extends Component {
  constructor(props) {
    super(props);
    this.state = { active: null };
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

    if (!playingEpisode) { return; }
    dispatch(postComment(playingEpisode.id, comment, audioCurrentTime));

    this.refs.commentInput.value = '';
  }
  handleKeyDown(e) {
    if (e.keyCode ===   13) {
      this.handlePostClick();
    }
  }
  render() {
    const { active } = this.state;
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
              placeholder="コメント...カラでもok"
              onKeyDown={this.handleKeyDown.bind(this)}
            />
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
