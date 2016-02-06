import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayingAudio, setAudioIntervalID, setAudioCurrentTime, setIsPlaying, initPlaying } from '../actions'
import PlayAndPauseButton from './PlayAndPauseButton';
import TimeBar from './TimeBar';

class Player extends Component {
  componentWillReceiveProps(nextProps) {
    let { dispatch } = this.props;
    let track   = nextProps.playingTrack;
    let episode = nextProps.playingEpisode;
    let audio   = null;

    if (!episode) { return; }

    if (this.audio) {
      this.audio.pause();
    }

    audio = this.audio = new Audio();
    audio.src = episode.url;
    audio.play();

    dispatch(setPlayingAudio(audio));

    if (track && episode) {
      audio.currentTime = track.start_time;

      let intervalID = setInterval(() => {
        if (this.isEnd(audio.currentTime)) {
          audio.pause();
          dispatch(initPlaying());
        }
        dispatch(setAudioCurrentTime(audio.currentTime));
      }, 100);

      dispatch(setAudioIntervalID(intervalID));
    }

    audio.addEventListener('playing', () => {
      dispatch(setIsPlaying(true));
    });
    audio.addEventListener('pause', () => {
      dispatch(setIsPlaying(false));
    });
    audio.addEventListener('ended', () => {
      dispatch(setIsPlaying(false));
    });
  }
  isEnd(currentTime) {
    return this.props.playingTrack.end_time <= currentTime;
  }
  render() {
    let episode     = this.props.playingEpisode;
    let programName = episode && episode.program.name;
    let episodeNo   = episode && episode.episode_no;

    return (
      <div id="player">
        <div className="controllers">
          <PlayAndPauseButton audio={ this.audio } />
        </div>
        <div className="track-info">
          <span className="program-name">{programName}</span>
          <span className="episode-no" style={{ display: episode ? 'inline' : 'none' }}>{episodeNo}</span>
        </div>
        <TimeBar />
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingTrack  : state.pickApp.playingTrack,
    playingEpisode: state.pickApp.playingEpisode
  }
})(Player);
