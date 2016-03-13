import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { generateAudio, initPlaying, toggleActiveTrack } from '../actions'

class PlayToggleButtonForTrack extends Component {
  handleClick() {
    let { track, isPlaying } = this.props;

    if (track.isActive && isPlaying) {
      this.handlePauseClick();
    } else if (track.isActive) {
      this.handleResumeClick();
    } else {
      this.handlePlayClick();
    }
  }
  handlePlayClick() {
    let { dispatch, track, episode } = this.props;

    dispatch(initPlaying());
    setTimeout(() => {
      dispatch(generateAudio(episode, track));
      dispatch(toggleActiveTrack(track.id));
    }, 100);
  }
  handlePauseClick() {
    let { playingAudio } = this.props;
    playingAudio.pause();
  }
  handleResumeClick() {
    let { playingAudio } = this.props;
    playingAudio.play();
  }
  getClassName() {
    let { isPlaying, track } = this.props;

    if (track.isActive && isPlaying) {
      return 'fa fa-pause';
    }
    return 'fa fa-play';
  }
  render() {
    return (
      <button
        onClick={ this.handleClick.bind(this) }
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
})(PlayToggleButtonForTrack);
