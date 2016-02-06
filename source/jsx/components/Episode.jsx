import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { setPlayingTrack, setPlayingEpisode } from '../actions'
import TimeLineForEpisode from '../components/TimeLineForEpisode';

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
    let min    = ('0' + Math.floor(length / 60)).slice(-2);
    let sec    = ('0' + length % 60).slice(-2);

    return `${min}:${sec}`
  }
  getGuestsDom() {
    let { episode } = this.props;
    return episode.guests.map((g) => {
      let name = g.name_ja ? g.name_ja : (g.name_en ? g.name_en : g.nickname);
      return <span key={name} className="guest-name">{name}</span>
    });
  }
  render() {
    let { episode } = this.props;

    return (
      <div className="track">
        <div className="head">
          <div className="track-controller">
            <button
              className="play-button"
              onClick={this.handlePlayClick.bind(this)}>
              <i className="fa fa-play"></i>
            </button>
          </div>
          <div className="track-information">
            <div className="title">{this.getTitle()}</div>
            <div className="time">
              <div className="time-length">{this.getTimeLength()}</div>
            </div>
            <div className="guests">
              <span className="ahead">Guests:</span>
              {this.getGuestsDom()}
            </div>
          </div>
        </div>
        <div className="bottom">
          <TimeLineForEpisode episodeTracks={episode.tracks} />
        </div>
      </div>
    );
  }
}

export default connect()(Episode);
