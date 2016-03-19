import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setSelectedGuestId } from '../actions';
import _ from 'underscore';
import AudioPiece from './AudioPiece'
import TimeLineForEpisode from './TimeLineForEpisode';
import CommentLine from './CommentLine';
import PlayToggleButtonForEpisode from './PlayToggleButtonForEpisode';
import LoadingBar from './LoadingBar';

class Episode extends AudioPiece {
  handleGuestLinkClick(guestId) {
    const { dispatch } = this.props;
    dispatch(setSelectedGuestId(guestId));
  }
  getTimeLength() {
    const { episode } = this.props;
    const length      = episode.time_length;
    const min         = ('0' + Math.floor(length / 60)).slice(-2);
    const sec         = ('0' + length % 60).slice(-2);

    return `${min}:${sec}`
  }
  getGuestsDom() {
    const { episode } = this.props;
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
    const { episode } = this.props;
    const date  = new Date(episode.delivered_at);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day   = ('0' + date.getDate()).slice(-2);
    return <span>{`${date.getFullYear()}/${month}/${day}`}</span>;
  }
  render() {
    const { episode } = this.props;

    return (
      <div className="episode">
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
          <LoadingBar episode={episode} />
          <TimeLineForEpisode episode={episode} />
          <CommentLine episode={episode} />
        </div>
      </div>
    );
  }
}

export default connect()(Episode);
