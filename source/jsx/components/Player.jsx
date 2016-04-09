import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setAudioIntervalID,
  setAudioCurrentTime,
  setIsPlaying,
  setLoadedPercentage,
  resetPlaying,
  addComments
} from '../actions'
import PlayToggleButtonForPlayer from './PlayToggleButtonForPlayer';
import TimeBar from './TimeBar';
import Volume from './Volume';
import ShareButton from './ShareButton';

class Player extends Component {
  componentWillReceiveProps(nextProps) {
    const { dispatch }  = this.props;
    const prevAudio   = this.props.playingAudio;
    const nextAudio   = nextProps.playingAudio;
    const episode     = nextProps.playingEpisode;

    if (!nextAudio) {
      return;
    }

    if (prevAudio === nextAudio) {
      return;
    }

    const intervalSec = 1000;
    const intervalID = setInterval(() => {
      if (nextAudio.paused) { return; }

      const currentTime = nextAudio.currentTime;
      const comments = episode.comments.filter((c) => {
        return currentTime - (intervalSec / 1000) < c.seconds && c.seconds <= currentTime;
      });
      dispatch(addComments(comments, true));

      if (this.isEnd(currentTime)) {
        nextAudio.pause();
        dispatch(resetPlaying());
        return;
      }

      dispatch(setAudioCurrentTime(currentTime));
    }, intervalSec);

    dispatch(setAudioIntervalID(intervalID));

    nextAudio.addEventListener('play', () => {
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
  formatTime(length) {
    if (Number.isNaN(length)) {
      length = 0;
    }
    const min = ('0' + Math.floor(length / 60)).slice(-2);
    const sec = ('0' + length % 60).slice(-2);
    return <span>{min}<span className="separator">:</span>{sec}</span>;
  }
  getEndTimeText() {
    const { playingEpisode, playingTrack } = this.props;
    let length = 0;

    if (playingTrack) {
      length = playingTrack.end_time - playingTrack.start_time;
    } else if (playingEpisode) {
      length = playingEpisode.time_length;
    }
    return this.formatTime(length);
  }
  getCurrentTimeText() {
    const { playingTrack, audioCurrentTime } = this.props;
    let length = audioCurrentTime;

    if (playingTrack) {
      length = audioCurrentTime - playingTrack.start_time;
    }
    return this.formatTime(Math.ceil(length));
  }
  render() {
    return (
      <div id="player">
        <div className="controllers">
          <PlayToggleButtonForPlayer />
          <Volume />
          <ShareButton />
        </div>
        <div className="track-info">
          <span>{this.getTitle()}</span>
        </div>
        <TimeBar />
        <div className="time-info">
          <div className="current">{this.getCurrentTimeText()}</div>
          <div className="end">{this.getEndTimeText()}</div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingAudio    : state.pickApp.playingAudio,
    playingTrack    : state.pickApp.playingTrack,
    playingEpisode  : state.pickApp.playingEpisode,
    audioCurrentTime: state.pickApp.audioCurrentTime
  }
})(Player);
