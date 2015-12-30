import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';

class PlayAndPauseButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isPlaying: false };
  }
  isPlaying(audio) {
    if (!audio) {
      return false;
    }
    return !audio.paused;
  }
  playOrPause(audio) {
    if (this.isPlaying(audio)) {
      audio.pause();
      this.setState({ isPlaying: false });
    } else {
      audio.play();
      this.setState({isPlaying: true});
    }
  }
  render() {
    return (
      <button
        onClick={ this.playOrPause.bind(this, this.props.audio) }
        disabled={ this.props.isDisabled }
        className="button play"
      >
        <i className={ this.isPlaying(this.props.audio) ? 'fa fa-pause' : 'fa fa-play' }></i>
      </button>
    );
  }
}

export default connect()(PlayAndPauseButton);