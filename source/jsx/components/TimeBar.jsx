import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';

class TimeBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isPlaying: false };
  }
  componentWillMount() {
    this.setState({ fillPercentage: 0 });
  }
  componentWillReceiveProps(nextProps) {
    let track = nextProps.playingTrack;
    let audio = nextProps.playingAudio;

    if (!track || !audio) {
      this.setState({ fillPercentage: 0 });
      return;
    }

    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }

    let timeLength = track.end_time - track.start_time;


    let intervalId = setInterval(() => {
      let currentTimePosition = (Math.round(audio.currentTime * 10) / 10) - track.start_time;
      this.setState({ fillPercentage: (currentTimePosition / timeLength) * 100 });
    }, 100);

    this.setState({ intervalId: intervalId });
  }
  render() {
    return (
      <div id="time-bar">
        <div className="fill" style={{ width: this.state.fillPercentage + '%' }} ></div>
        <div className="unfill" style={{ width: 100 - this.state.fillPercentage + '%' }} ></div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingTrack: state.pickApp.playingTrack,
    playingAudio: state.pickApp.playingAudio
  }
})(TimeBar);
