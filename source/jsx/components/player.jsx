import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayAndPauseButton from './playAndPauseButton';

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
  }
  isEnd(currentTime) {
    return this.props.playingTrack.end_time <= currentTime;
  }
  render() {
    return (
      <div id="player">
        <PlayAndPauseButton audio={ this.audio } />
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingTrack: state.pickApp.playingTrack
  }
})(Player);
