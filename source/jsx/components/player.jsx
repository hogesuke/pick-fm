import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  getAudioUrl() {
    let track = this.props.playingTrack;
    return track.url;
  }
  componentDidUpdate() {
    let track = this.props.playingTrack;

    if (!track) return;

    if (this.audio) {
      this.audio.pause();
    }

    let audio = this.audio = new Audio();
    audio.currentTime = track.start_time;
    audio.src = this.getAudioUrl();

    let intervalID = setInterval(() => {
      if (this.isEnd(audio.currentTime)) {
        audio.pause();
        clearInterval(intervalID);
      }
    }, 500);

    this.play();
  }
  isEnd(currentTime) {
    return this.props.playingTrack.end_time <= currentTime;
  }
  play() {
    this.audio.play();
  }
  pause() {
    this.audio.pause();
  }
  render() {
    let isDisabled = true;
    if (this.props.playingTrack) {
      isDisabled = false;
    }

    return (
      <div>
        <button onClick={this.play.bind(this)} disabled={isDisabled}>Play</button>
        <button onClick={this.pause.bind(this)} disabled={isDisabled}>Pause</button>
      </div>
    );
  }
}

export default connect()(Player);
