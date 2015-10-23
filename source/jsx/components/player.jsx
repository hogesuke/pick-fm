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
    if (!this.props.playingTrack) {
      return (
        <div>再生するエピソードを選んでください</div>
      );
    }

    return (
      <div>
        <button onClick={this.play.bind(this)}>Play</button>
        <button onClick={this.pause.bind(this)}>Pause</button>
      </div>
    );
  }
}

export default connect()(Player);
