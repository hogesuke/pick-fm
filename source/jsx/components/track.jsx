import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { addTrackToPlayList } from '../actions'

class Track extends Component {
  handleAddToPlayList() {
    this.props.onAddClick(this.props.track);
  }
  handleRemoveFromPlayList() {
    this.props.onRemoveClick(this.props.track);
  }
  getTitle() {
    let track = this.props.track;
    return `${track.program_name} ep${track.episode} `
  }
  getTimeLength() {
    let track = this.props.track;
    let length = track.end_time - track.start_time;
    let min = Math.floor(length / 60);
    let sec = length % 60;

    return `${min}m${sec}s`
  }
  getTimeRange() {
    let track = this.props.track;

    return `${this.formatTime(track.start_time)} - ${this.formatTime(track.end_time)}`
  }
  formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = time % 60;

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
  render() {
    let track = this.props.track;
    let addButton = null;
    let removeButton = null;
    let episodeEndTime = _.last(this.props.episodeTracks).end_time;

    if (this.props.onAddClick) {
      addButton = <button className="add-button" onClick={this.handleAddToPlayList.bind(this)}>+</button>;
    }
    if (this.props.onRemoveClick) {
      removeButton = <button className="remove-button" onClick={this.handleRemoveFromPlayList.bind(this)}>-</button>;
    }

    let tags = _.map(this.getTags(track), (tag) => {
      return <span className="tag">{tag}</span>;
    });

    let timeLineTracks = _.map(this.props.episodeTracks, (episodeTrack) => {
      let padLeftPercent  = Math.round((episodeTrack.start_time / episodeEndTime) * 100);
      let trackPercent    = Math.round((episodeTrack.end_time / episodeEndTime) * 100) - padLeftPercent;
      let padRightPercent = 100 - padLeftPercent - trackPercent;
      let tags = _.map(this.getTags(episodeTrack), (tag) => {
        return <span className="tag">{tag}</span>;
      });
      let isSelf = episodeTrack.id === track.id;

      return (
        <div className={ isSelf ? 'self' : '' }>
          <div className="tags">{tags}</div>
          <div className="pad" style={{ width: `${padLeftPercent}%` }}></div>
          <div className="block" style={{ width: `${trackPercent}%` }}></div>
          <div className="pad" style={{ width: `${padRightPercent}%` }}></div>
        </div>
      )
    });

    return (
      <div className="track">
        <div className="left">
          {addButton}
          {removeButton}
        </div>
        <div className="main">
          <div className="head">
            <div className="title">{this.getTitle()}</div>
            <div className="time">
              <div className="time-length">{this.getTimeLength()}</div>
              <div className="time-range">（{this.getTimeRange()}）</div>
            </div>
          </div>
          <div className="bottom">
            <div className="tag-list">{tags}</div>
            <div className="time-line">{timeLineTracks}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Track);
