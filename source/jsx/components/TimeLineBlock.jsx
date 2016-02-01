import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

class TimeLineBlock extends Component {
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
    let { track, episodeEndTime, isActive } = this.props;

    let padLeftPercent  = Math.round((track.start_time / episodeEndTime) * 100);
    let trackPercent    = Math.round((track.end_time / episodeEndTime) * 100) - padLeftPercent;
    let padRightPercent = 100 - padLeftPercent - trackPercent;

    let tags = this.getTags(track).map((tag) => {
      return <span key={tag} className="tag">{tag}</span>;
    });

    return (
      <div className={ isActive ? 'self' : '' }>
        <div className="tags">{tags}</div>
        <div className="pad"   style={{ width: `${padLeftPercent}%` }}></div>
        <div className="block" style={{ width: `${trackPercent}%` }}></div>
        <div className="pad"   style={{ width: `${padRightPercent}%` }}></div>
      </div>
    );
  }
}

export default connect()(TimeLineBlock);
