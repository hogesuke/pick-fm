import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';

class TimeBar extends Component {
  constructor(props) {
    super(props);
    this.state = { fillPercentage: 0 };
  }
  handleClick(event) {
    const { playingTrack, playingEpisode, playingAudio } = this.props;

    if (!playingTrack && !playingEpisode) {
      return;
    }

    const elementX   = event.nativeEvent.target.clientWidth;
    const pointX     = event.nativeEvent.offsetX;
    const percentage = pointX / elementX;
    let dest = null;

    if (playingTrack) {
      // track再生の場合
      const length = playingTrack.end_time - playingTrack.start_time;
      dest = playingTrack.start_time + (length * percentage);
    } else {
      // episode再生の場合
      const length = playingEpisode.time_length;
      dest = length * percentage;
    }

    playingAudio.currentTime = Math.round(dest);
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
      let fillPercentage = (currentTimePosition / timeLength) * 100;

      fillPercentage = fillPercentage <= 100 ? fillPercentage : 100;

      this.setState({ fillPercentage: fillPercentage });
    }, 100);

    this.setState({ intervalId: intervalId });
  }
  render() {
    const { fillPercentage } = this.state;
    return (
      <div id="time-bar" onClick={this.handleClick.bind(this)}>
        <div className="fill" style={{ width: fillPercentage + '%' }} ></div>
        <div className="unfill" style={{ width: 100 - fillPercentage + '%' }} ></div>
        <div className="overlay"></div>
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
