import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import TimeLineBlock from './TimeLineBlock';

class LoadingBar extends Component {
  constructor(props) {
    super(props);
  }
  getFillPercentage() {
    const { loadedPercentage } = this.props;

    if (this.isActive()) {
      return loadedPercentage;
    }
    return 0;
  }
  isActive() {
    let { playingTrack, playingEpisode, episode, track } = this.props;

    if (!playingEpisode) {
      return false;
    }
    if (playingTrack && track) {
      // track再生の場合
      return playingEpisode.id === episode.id && playingTrack.id === track.id;
    }
    // episode再生の場合
    return playingEpisode.id === episode.id;
  }
  render() {
    return (
      <div className="loading-bar">
        <div className="fill" style={{ width: `${ this.getFillPercentage() }%` }}></div>
        <div className="unfill" style={{ width: `${ 100 - this.getFillPercentage() }%` }}></div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingTrack    : state.pickApp.playingTrack,
    playingEpisode  : state.pickApp.playingEpisode,
    loadedPercentage: state.pickApp.loadedPercentage
  };
})(LoadingBar);
