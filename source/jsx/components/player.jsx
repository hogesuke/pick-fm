import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayingAudio } from '../actions'
import PlayAndPauseButton from './playAndPauseButton';
import TimeBar from './timebar';

class Player extends Component {
  componentWillReceiveProps(nextProps) {
    let track = nextProps.playingTrack;

    if (!track) return;

    if (this.audio) {
      this.audio.pause();
    }

    let audio = this.audio = new Audio();
    audio.currentTime = track.start_time;
    audio.src = track.url;

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
    return (
      <div id="player">
        <div className="controllers">
          <PlayAndPauseButton audio={ this.audio } />
        </div>
        <TimeBar />
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingTrack: state.pickApp.playingTrack
  }
})(Player);
