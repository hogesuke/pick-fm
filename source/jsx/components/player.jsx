import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { isPaused: false };
  }
  getAudioUrl() {
    let track = this.props.playingTrack;
    return track.url;
  }
  componentDidUpdate() {
    console.debug('componentDidUpdate');
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

    this.playOrPause();
  }
  isEnd(currentTime) {
    // todo endedメソッドで判定可能っぽい。後で試してみる
    return this.props.playingTrack.end_time <= currentTime;
  }
  playOrPause() {
    console.debug('playOrPause');
    if (this.audio.paused) {
      this.audio.play();
      this.setState({ isPaused: false });
    } else {
      this.audio.pause();
      this.setState({ isPaused: true });
    }
  }
  render() {
    let isDisabled = true;
    if (this.props.playingTrack) {
      isDisabled = false;
    }

    return (
      <div id="player">
        <button onClick={this.playOrPause.bind(this)} disabled={isDisabled} className="button play">
          <i className={this.state.isPaused ? 'fa fa-play' : 'fa fa-pause'}></i>
        </button>
      </div>
    );
  }
}

export default connect()(Player);
