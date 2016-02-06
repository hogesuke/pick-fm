import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import TimeLineBlock from '../components/TimeLineBlock';

class TimeLineForTrack extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTrack: this.props.track, intervalID: null };
  }
  componentWillReceiveProps(nextProps) {
    let { track } = nextProps;

    if (!this.isActive(nextProps)) {
      this.setState({ activeTrack: this.props.track });
      return;
    }

    this.setState({ activeTrack: track });
  }
  isActive(props) {
    let { playingTrack, playingEpisode, track, episodeTracks } = props;
    return playingTrack.id === track.id && playingEpisode.episode_no === _.first(episodeTracks).episode_no;
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
})(TimeLineForTrack);

