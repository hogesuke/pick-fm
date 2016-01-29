import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

class TimeLine extends Component {
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
    let { track, episodeTracks } = this.props;
    let episodeEndTime = _.last(episodeTracks).end_time;

    let timeLineTracks = _.map(episodeTracks, (episodeTrack) => {
      let padLeftPercent  = Math.round((episodeTrack.start_time / episodeEndTime) * 100);
      let trackPercent    = Math.round((episodeTrack.end_time / episodeEndTime) * 100) - padLeftPercent;
      let padRightPercent = 100 - padLeftPercent - trackPercent;

      let tags = _.map(this.getTags(episodeTrack), (tag) => {
        return <span className="tag">{tag}</span>;
      });

      let isSelf = !!track ? episodeTrack.id === track.id : false;

      return (
        <div className={ isSelf ? 'self' : '' }>
          <div className="tags">{tags}</div>
          <div className="pad"   style={{ width: `${padLeftPercent}%` }}></div>
          <div className="block" style={{ width: `${trackPercent}%` }}></div>
          <div className="pad"   style={{ width: `${padRightPercent}%` }}></div>
        </div>
      )
    });

    return <div className="time-line">{timeLineTracks}</div>;
  }
}

export default connect()(TimeLine);
