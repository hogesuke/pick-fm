import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateAudio, initPlaying, toggleActiveEpisode } from '../actions'
import _ from 'underscore';
import TimeLineBlock from './TimeLineBlock';

class TimeLineForEpisode extends Component {
  isActive(track) {
    let { playingTrack, playingEpisode } = this.props;

    if (!playingEpisode) {
      return false;
    }
    if (playingEpisode.episode_no !== track.episode_no) {
      return false;
    }
    if (playingEpisode.episode_type !== track.episode_type) {
      return false;
    }
    if (playingTrack) {
      // track単位での再生の場合
      if (playingTrack.id !== track.id) {
        return false;
      }
    }
    return true;
  }
  onClickTimeLineBlock(episode, track) {
    let { dispatch } = this.props;

    dispatch(initPlaying());
    setTimeout(() => {
      dispatch(generateAudio(episode, null, track.start_time));
      dispatch(toggleActiveEpisode(episode.id));
    }, 100);
  }
  render() {
    let { episode } = this.props;
    let episodeLength = _.last(episode.tracks).end_time;

    let blocks = episode.tracks.map((track) => {
      return (
        <TimeLineBlock
          key={track.id}
          track={track}
          episodeLength={episodeLength}
          isActive={this.isActive(track)}
          onClick={() => { this.onClickTimeLineBlock(episode, track); }}
        />
      );
    });

    return <div className="time-line">{blocks}</div>;
  }
}

export default connect(state => {
  return {
    playingTrack  : state.pickApp.playingTrack,
    playingEpisode: state.pickApp.playingEpisode
  };
})(TimeLineForEpisode);

