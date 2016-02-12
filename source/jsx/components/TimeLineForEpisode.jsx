import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayingTrack, setPlayingEpisode, initPlaying, toggleActiveEpisode } from '../actions'
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
  onClickTimeLineBlock(track, episode) {
    let { dispatch } = this.props;

    dispatch(initPlaying());
    setTimeout(() => {
      dispatch(setPlayingTrack(track));
      dispatch(setPlayingEpisode(episode));
      dispatch(setPlayingEpisode(episode));
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
          onClick={() => { this.onClickTimeLineBlock(track, episode); }}
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

