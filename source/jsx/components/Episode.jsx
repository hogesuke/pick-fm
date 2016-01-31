import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { setPlayingTrack, setPlayingEpisode } from '../actions'
import TimeLine from '../components/TimeLine';

class Episode extends Component {
  handlePlayClick() {
    this.props.dispatch(setPlayingTrack(null));
    this.props.dispatch(setPlayingEpisode(this.props.episode));
  }
  getTitle() {
    let { episode } = this.props;
    return `Episode ${episode.episode_no} `
  }
  getTimeLength() {
    let { episode } = this.props;

    let length = episode.time_length;
    let min    = Math.floor(length / 60);
    let sec    = length % 60;

    return `${min}m${sec}s`
  }
  render() {
    let { episode } = this.props;

    return (
      <div className="track">
        <div className="head">
          <div className="track-information">
            <div className="title">{this.getTitle()}</div>
            <div className="time">
              <div className="time-length">{this.getTimeLength()}</div>
            </div>
          </div>
          <div className="track-controller">
            <button
              className="play-button"
              onClick={this.handlePlayClick.bind(this)}>
              <i className="fa fa-play"></i>
            </button>
          </div>
        </div>
        <div className="bottom">
          <TimeLine episodeTracks={episode.tracks} />
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    searchText: state.pickApp.searchText
  };
})(Episode);
