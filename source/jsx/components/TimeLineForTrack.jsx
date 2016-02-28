import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import TimeLineBlock from '../components/TimeLineBlock';

class TimeLineForTrack extends Component {
  isActive(track) {
    const { playingEpisode, playingTrack } = this.props;

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
    const { episode, track } = this.props;
    const episodeLength = _.last(episode.tracks).end_time;

    const targetTrack = episode.tracks.find((episodeTrack) => {
      return track.id === episodeTrack.id;
    });

    const timeLineBlock = (() => {
      if (!targetTrack) {
        return null;
      }
      return (
        <TimeLineBlock
          key={targetTrack.id}
          track={targetTrack}
          episodeLength={episodeLength}
          isActive={this.isActive(targetTrack)}
        />
      );
    })();

    return <div className="time-line">{timeLineBlock}</div>;
  }
}

export default connect(state => {
  return {
    playingTrack  : state.pickApp.playingTrack,
    playingEpisode: state.pickApp.playingEpisode,
    playingAudio  : state.pickApp.playingAudio
  };
})(TimeLineForTrack);

