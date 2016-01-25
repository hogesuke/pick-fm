import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayingAudio } from '../actions'
import PlayAndPauseButton from './playAndPauseButton';
import TimeBar from './timebar';

class Player extends Component {
  componentWillReceiveProps(nextProps) {
    let track   = nextProps.playingTrack;
    let episode = nextProps.playingEpisode;

    if (!track) return;

    if (this.audio) {
      this.audio.pause();
    }

    let audio = this.audio = new Audio();
    audio.currentTime = track.start_time;
    audio.src = episode.url;

    let intervalID = setInterval(() => {
      if (this.isEnd(audio.currentTime)) {
        audio.pause();
        clearInterval(intervalID);
      }
    }, 500);

    audio.play();

    this.props.dispatch(setPlayingAudio(audio))
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
