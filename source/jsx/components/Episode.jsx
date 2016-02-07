import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { setPlayingTrack, setPlayingEpisode, initPlaying } from '../actions'
import TimeLineForEpisode from '../components/TimeLineForEpisode';

class Episode extends Component {
  handlePlayClick() {
    let { dispatch, episode } = this.props;

    dispatch(initPlaying());
    dispatch(setPlayingEpisode(episode));
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
  getDeliveredAtDom() {
    let { episode } = this.props;
    let date  = new Date(episode.delivered_at);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day   = ('0' + date.getDate()).slice(-2);
    return <span>{`${date.getFullYear()}/${month}/${day}`}</span>;
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
            <div className="delivered-at">
              {this.getDeliveredAtDom()}
            </div>
            <div className="guests">
              <span className="ahead">Guests:</span>
              {this.getGuestsDom()}
            </div>
          </div>
        </div>
        <div className="bottom">
          <TimeLineForEpisode episode={episode} />
        </div>
      </div>
    );
  }
}

export default connect()(Episode);
