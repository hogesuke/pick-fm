import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

class TimeLineBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { unfillPercentage: 100, intervalID: null };
  }
  handleClick() {
    const { onClick } = this.props;
    if (onClick) { onClick(); }
  }
  componentWillReceiveProps(nextProps) {
    let { track, isActive, audioCurrentTime } = nextProps;

    if (!isActive) {
      this.setState({ unfillPercentage: 100 });
      return;
    }
    if (track.end_time <= audioCurrentTime) {
      this.setState({ unfillPercentage: 100 });
      return;
    }
    if (audioCurrentTime <= track.start_time) {
      this.setState({ unfillPercentage: 0 });
      return;
    }

    let timeLength = track.end_time - track.start_time;
    let currentTimePosition = (Math.round(audioCurrentTime * 100) / 100) - track.start_time;

    this.setState({ unfillPercentage: (currentTimePosition / timeLength) * 100 });
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
    const { track, episodeLength, searchText } = this.props;
    let { unfillPercentage } = this.state;

    if (unfillPercentage === void 0) {
      unfillPercentage = 100;
    }

    let padLeftPercent  = Math.round((track.start_time / episodeLength) * 100);
    let trackPercent    = Math.round((track.end_time / episodeLength) * 100) - padLeftPercent;
    let padRightPercent = 100 - padLeftPercent - trackPercent;

    let tags = this.getTags(track).map((tag) => {
      return (
        <span key={tag} className={ searchText && new RegExp(searchText, 'i').test(tag) ? 'tag hit' : 'tag' }>
          {tag}
        </span>
      );
    });

    return (
      <div className="block-container" onClick={this.handleClick.bind(this)}>
        <div className="tags">{tags}</div>
        <div className="pad" style={{ width: `${padLeftPercent}%` }}></div>
        <div className="block" style={{ width: `${trackPercent}%` }}>
          <div className="unfill" style={{ width: `${unfillPercentage}%` }}></div>
          <div className="fill" style={{ width: `${100 - unfillPercentage}%` }}></div>
        </div>
        <div className="pad" style={{ width: `${padRightPercent}%` }}></div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    audioCurrentTime: state.pickApp.audioCurrentTime,
    searchText    : state.pickApp.searchText
  };
})(TimeLineBlock);
