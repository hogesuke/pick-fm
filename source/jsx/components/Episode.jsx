import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setSelectedGuestId } from '../actions';
import _ from 'underscore';
import TimeLineForEpisode from './TimeLineForEpisode';
import PlayToggleButtonForEpisode from './PlayToggleButtonForEpisode';

class Episode extends Component {
  handleGuestLinkClick(guestId) {
    const { dispatch } = this.props;
    dispatch(setSelectedGuestId(guestId));
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
      return (
        <Link
          key={name}
          to={`/guests/${g.id}/episodes`}
          onClick={() => { this.handleGuestLinkClick(g.id) }}
          className="guest-name"
        >
          {name}
        </Link>
      );
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
            <PlayToggleButtonForEpisode episode={episode} />
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
