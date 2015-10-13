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

    let audio = this.audio = new Audio(this.getAudioUrl());
    audio.addEventListener('play', function() {
      audio.currentTime = track.start_time;
    });
  }
  play() {
    this.audio.play();
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
      </div>
    );
  }
}

export default connect()(Player);
