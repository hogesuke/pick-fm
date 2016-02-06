import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import TimeLineBlock from '../components/TimeLineBlock';

class TimeLineForTrack extends Component {
  isActive(track) {
    let { playingEpisode, playingTrack } = this.props;

    if (!playingEpisode || !playingTrack) {
      return false;
    }
    if (playingEpisode.episode_no !== track.episode_no) {
      return false;
    }
    if (playingEpisode.episode_type !== track.episode_type) {
      return false;
    }
    if (playingTrack.id !== track.id) {
      return false;
    }
    return true;
  }
  render() {
    let { episodeTracks } = this.props;
    let episodeLength = _.last(episodeTracks).end_time;

    let blocks = episodeTracks.map((track) => {
      return (
        <TimeLineBlock
          key={track.id}
          track={track}
          episodeLength={episodeLength}
          isActive={this.isActive(track)}
        />
      );
    });

    return <div className="time-line">{blocks}</div>;
  }
}

export default connect(state => {
  return {
    playingTrack  : state.pickApp.playingTrack,
    playingEpisode: state.pickApp.playingEpisode,
    playingAudio  : state.pickApp.playingAudio
  };
})(TimeLineForTrack);

