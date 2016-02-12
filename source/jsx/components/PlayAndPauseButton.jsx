import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { setIsPlaying } from '../actions'

class PlayAndPauseButton extends Component {
  toggle() {
    let { playingAudio, isPlaying } = this.props;

    if (!playingAudio) { return false; }

    if (isPlaying) {
      playingAudio.pause();
    } else {
      playingAudio.play();
    }
  }
  getClassName() {
    let { isPlaying } = this.props;

    if (!isPlaying) {
      return 'fa fa-play';
    }
    return 'fa fa-pause';
  }
  render() {

    return (
      <button
        onClick={ this.toggle.bind(this) }
        className="button play"
      >
        <i className={this.getClassName()}></i>
      </button>
    );
  }
}

export default connect(state => {
  return {
    isPlaying   : state.pickApp.isPlaying,
    playingAudio: state.pickApp.playingAudio
  }
})(PlayAndPauseButton);
