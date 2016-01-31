import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { setIsPlaying } from '../actions'

class PlayAndPauseButton extends Component {
  toggle(audio) {
    if (!audio) { return false; }

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }
  render() {
    let { audio, isPlaying } = this.props;

    return (
      <button
        onClick={ this.toggle.bind(this, audio) }
        disabled={ audio ? false : true }
        className="button play"
      >
        <i className={ isPlaying ? 'fa fa-pause' : 'fa fa-play' }>&nbsp;</i>
      </button>
    );
  }
}

export default connect(state => {
  return {
    isPlaying: state.pickApp.isPlaying
  }
})(PlayAndPauseButton);
