import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import { initPlaying } from '../actions'
import TimeLineForTrack from '../components/TimeLineForTrack';
import PlayToggleButtonForTrack from './PlayToggleButtonForTrack';
import LoadingBar from './LoadingBar';
import AudioPiece from './AudioPiece';
import QueryUtil from '../util/QueryUtil';

class Track extends AudioPiece {
  handleGuestLinkClick(guestId) {
    const { dispatch, query } = this.props;
    dispatch(replaceState(null, '/search', QueryUtil.addQuery(query, 'guest', guestId)));
  }
  getTimeLength() {
    const { track } = this.props;
    const length    = track.end_time - track.start_time;
    const min       = ('0' + Math.floor(length / 60)).slice(-2);
    const sec       = ('0' + length % 60).slice(-2);

    return `${min}:${sec}`;
  }
  getTimeRange() {
    const { track } = this.props;
    return `${this.formatTime(track.start_time)} - ${this.formatTime(track.end_time)}`
  }
  formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = time % 60;

    return `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`
  }
  getTags(track) {
    let tags = [];

    if (track.tag_en) {
      tags = tags.concat(track.tag_en)
    }
    if (track.tag_ja) {
      tags = tags.concat(track.tag_ja)
    }
    return tags;
  }
  getGuestsDom() {
    const { episode } = this.props;
    return episode.guests.map((g) => {
      let name = g.name_ja ? g.name_ja : (g.name_en ? g.name_en : g.nickname);
      return <a key={g.id} onClick={() => { this.handleGuestLinkClick(g.id) }} className="guest-name">{name}</a>
    });
  }
  render() {
    const { track, episode } = this.props;

    return (
      <div className="track">
        <div className="head">
          <div className="track-controller">
            <PlayToggleButtonForTrack track={track} episode={episode} />
          </div>
          <div className="track-information">
            <div className="title">{this.getTitle()}</div>
            <div className="time">
              <div className="time-length">{this.getTimeLength()}</div>
              <div className="time-range">（{this.getTimeRange()}）</div>
            </div>
            <div className="guests">
              <span className="ahead">Guests:</span>
              {this.getGuestsDom()}
            </div>
          </div>
        </div>
        <div className="bottom">
          <LoadingBar episode={episode} track={track} />
          <TimeLineForTrack track={track} episode={episode} />
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    query: state.router.location.query
  };
})(Track);

