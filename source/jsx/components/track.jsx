import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrackToPlayList } from '../actions'

class Track extends Component {
  handleAddToPlayList() {
    this.props.onAddClick(this.props.track);
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
  render() {
    return (
      <div className="track">
        <div className="left">
          <button className="add-button" onClick={this.handleAddToPlayList.bind(this)}>+</button>
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
            <div className="tag-list">{this.props.track.tag_en + ',' + this.props.track.tag_ja}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Track);
