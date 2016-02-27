import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { setPlayingEpisode, clearPlaying, toggleActiveEpisode } from '../actions'

class PlayToggleButtonForEpisode extends Component {
  handleClick() {
    let { episode, isPlaying } = this.props;

    if (episode.isActive && isPlaying) {
      this.handlePauseClick();
    } else if (episode.isActive) {
      this.handleResumeClick();
    } else {
      this.handlePlayClick();
    }
  }
  handlePlayClick() {
    let { dispatch, episode } = this.props;

    dispatch(clearPlaying());
    setTimeout(() => {
      dispatch(setPlayingEpisode(episode));
      dispatch(toggleActiveEpisode(episode.id));
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
    let { isPlaying, episode } = this.props;

    if (episode.isActive && isPlaying) {
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
})(PlayToggleButtonForEpisode);
