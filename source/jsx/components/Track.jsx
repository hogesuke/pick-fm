import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayingTrack, setPlayingEpisode } from '../actions'
import TimeLine from '../components/TimeLine';

class Track extends Component {
  handlePlayClick() {
    this.props.dispatch(setPlayingTrack(this.props.track));
    this.props.dispatch(setPlayingEpisode(this.props.episode));
  }
  getTitle() {
    let track = this.props.track;
    let episode = this.props.episode;
    return `${episode.program.name} Episode ${track.episode_no} `
  }
  getTimeLength() {
    let track = this.props.track;
    let length = track.end_time - track.start_time;
    let min    = ('0' + Math.floor(length / 60)).slice(-2);
    let sec    = ('0' + length % 60).slice(-2);

    return `${min}:${sec}`
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
    let { track, episodeTracks, searchText } = this.props;

    let tags = this.getTags(track).map((tag) => {
      return (
        <span key={tag} className={ searchText && new RegExp(searchText, 'i').test(tag) ? 'tag hit' : 'tag' } >
          {tag}
        </span>
      );
    });

    return (
      <div className="track">
        <div className="head">
          <div className="track-information">
            <div className="title">{this.getTitle()}</div>
            <div className="time">
              <div className="time-length">{this.getTimeLength()}</div>
              <div className="time-range">（{this.getTimeRange()}）</div>
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
          <div className="tag-list">{tags}</div>
          <TimeLine track={track} episodeTracks={episodeTracks} />
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    searchText: state.pickApp.searchText
  };
})(Track);

