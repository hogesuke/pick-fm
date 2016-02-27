import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';

class TimeBar extends Component {
  constructor(props) {
    super(props);
    this.state = { fillPercentage: 0 };
  }
  componentWillReceiveProps(nextProps) {
    const { playingTrack, playingEpisode, playingAudio } = nextProps;

    if (!playingAudio || (!playingTrack && !playingEpisode)) {
      this.setState({ fillPercentage: 0 });
      return;
    }

    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }

    let timeLength, startTime;

    if (playingTrack) {
      timeLength = playingTrack.end_time - playingTrack.start_time;
      startTime  = playingTrack.start_time;
    } else {
      timeLength = playingEpisode.time_length;
      startTime  = 0;
    }

    let intervalId = setInterval(() => {
      const currentTimePosition = (Math.round(playingAudio.currentTime * 10) / 10) - startTime;
      this.setState({ fillPercentage: (currentTimePosition / timeLength) * 100 });
    }, 100);

    this.setState({ intervalId: intervalId });
  }
  render() {
    const { fillPercentage } = this.state;
    return (
      <div id="time-bar">
        <div className="fill" style={{ width: fillPercentage + '%' }} ></div>
        <div className="unfill" style={{ width: 100 - fillPercentage + '%' }} ></div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingTrack  : state.pickApp.playingTrack,
    playingEpisode: state.pickApp.playingEpisode,
    playingAudio  : state.pickApp.playingAudio
  }
})(TimeBar);
