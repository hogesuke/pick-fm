import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import TimeLineBlock from '../components/TimeLineBlock';

class TimeLineForEpisode extends Component {
  isActive(track) {
    let { playingEpisode } = this.props;

    if (!playingEpisode) {
      return false;
    }
    if (playingEpisode.episode_no !== track.episode_no) {
      return false;
    }
    if (playingEpisode.episode_type !== track.episode_type) {
      return false;
    }
    return true;
  }
  render() {
    let { episodeTracks } = this.props;
    let episodeLength = _.last(episodeTracks).end_time;

    let blocks = episodeTracks.map((track) => {
      return (
        <TimeLineBlock
          key={track.id}
          track={track}
          episodeLength={episodeLength}
          isActive={this.isActive(track)}
        />
      );
    });

    return <div className="time-line">{blocks}</div>;
  }
}

export default connect(state => {
  return {
    playingEpisode: state.pickApp.playingEpisode
  };
})(TimeLineForEpisode);

