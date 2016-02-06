import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import TimeLineBlock from '../components/TimeLineBlock';

class TimeLineForEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTrack: this.props.track, intervalID: null };
  }
  componentWillReceiveProps(nextProps) {
    let { playingAudio, episodeTracks } = nextProps;
    let { intervalID } = this.state;

    if (!this.isActive(nextProps)) {
      this.setState({ activeTrack: this.props.track });
      if (intervalID) {
        clearInterval(intervalID);
      }
      return;
    }

    let currentTime = playingAudio.currentTime;
    let activeTrack = episodeTracks.find((t) => {
      return t.start_time <= currentTime && currentTime <= t.end_time;
    });

    intervalID = setInterval(() => {
      let { activeTrack } = this.state;
      let currentTime = playingAudio.currentTime;
      let newActiveTrack = episodeTracks.find((t) => {
        return t.start_time <= currentTime && currentTime <= t.end_time;
      });

      if (activeTrack.id !== newActiveTrack.id) {
        clearInterval(intervalID);
        this.setState({ activeTrack: newActiveTrack });
      }
    }, 100);

    this.setState({ activeTrack: activeTrack });
    this.setState({ intervalID: intervalID });
  }
  isActive(props) {
    let { playingEpisode, episodeTracks } = props;
    return playingEpisode.episode_no === _.first(episodeTracks).episode_no;
  }
  render() {
    let { episodeTracks } = this.props;
    let { activeTrack } = this.state;
    let episodeEndTime = _.last(episodeTracks).end_time;

    let blocks = episodeTracks.map((episodeTrack) => {
      return (
        <TimeLineBlock
          key={episodeTrack.id}
          track={episodeTrack}
          episodeEndTime={episodeEndTime}
          isActive={(activeTrack && activeTrack.id) === episodeTrack.id}
        />
      );
    });

    return <div className="time-line">{blocks}</div>;
  }
}

export default connect(state => {
  return {
    playingTrack  : state.pickApp.playingTrack,
    playingEpisode: state.pickApp.playingEpisode,
    playingAudio  : state.pickApp.playingAudio
  };
})(TimeLineForEpisode);

