import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import TimeLineBlock from '../components/TimeLineBlock';

class TimeLine extends Component {
  render() {
    let { track, episodeTracks } = this.props;
    let episodeEndTime = _.last(episodeTracks).end_time;

    let blocks = episodeTracks.map((episodeTrack) => {
      return (
        <TimeLineBlock
          key={episodeTrack.id}
          track={episodeTrack}
          episodeEndTime={episodeEndTime}
          isActive={(track && track.id) === episodeTrack.id}
        />
      );
    });

    return <div className="time-line">{blocks}</div>;
  }
}

export default connect()(TimeLine);
