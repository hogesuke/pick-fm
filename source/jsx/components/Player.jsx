import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAudioIntervalID, setAudioCurrentTime, setIsPlaying, setLoadedPercentage, resetPlaying } from '../actions'
import PlayToggleButtonForPlayer from './PlayToggleButtonForPlayer';
import TimeBar from './TimeBar';
import Volume from './Volume';

class Player extends Component {
  componentWillReceiveProps(nextProps) {
    let { dispatch }  = this.props;
    const prevAudio   = this.props.playingAudio;
    const nextAudio   = nextProps.playingAudio;

    if (!nextAudio) {
      return;
    }

    if (prevAudio === nextAudio) {
      return;
    }

    const intervalID = setInterval(() => {
      let currentTime = nextAudio.currentTime;

      if (this.isEnd(currentTime)) {
        nextAudio.pause();
        dispatch(resetPlaying());
        return;
      }

      dispatch(setAudioCurrentTime(currentTime));
    }, 1000);

    dispatch(setAudioIntervalID(intervalID));

    nextAudio.addEventListener('playing', () => {
      dispatch(setIsPlaying(true));
    });
    nextAudio.addEventListener('pause', () => {
      dispatch(setIsPlaying(false));
    });
    nextAudio.addEventListener('ended', () => {
      dispatch(resetPlaying());
    });
    nextAudio.addEventListener('loadstart', () => {
      dispatch(setLoadedPercentage(20));
    });
    nextAudio.addEventListener('loadeddata', () => {
      dispatch(setLoadedPercentage(100));
    });
  }
  isEnd(currentTime) {
    const { playingTrack } = this.props;

    if (playingTrack) {
      // track再生の場合
      return this.props.playingTrack.end_time <= currentTime;
    }
    // episode再生の場合
    return false;
  }
  getTitle() {
    const episode = this.props.playingEpisode;

    if (!episode) {
      return '';
    }

    let type = episode.episode_type.charAt(0).toUpperCase() + episode.episode_type.slice(1);
    type = type === 'Regular' ? '' : ' ' + type;

    return `${episode.program.name} Episode ${episode.episode_no + type}`;
  }
  render() {
    return (
      <div id="player">
        <div className="controllers">
          <PlayToggleButtonForPlayer />
          <Volume />
        </div>
        <div className="track-info">
          <span>{this.getTitle()}</span>
        </div>
        <TimeBar />
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingAudio  : state.pickApp.playingAudio,
    playingTrack  : state.pickApp.playingTrack,
    playingEpisode: state.pickApp.playingEpisode
  }
})(Player);
