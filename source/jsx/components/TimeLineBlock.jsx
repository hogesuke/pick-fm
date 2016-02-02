import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

class TimeLineBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { unfillPercentage: 100, intervalID: null };
  }
  componentWillReceiveProps(nextProps) {
    let { track, isActive, playingAudio } = nextProps;
    let { intervalID } = this.state;

    if (!isActive) {
      if (intervalID) {
        this.setState({ unfillPercentage: 100 });
        clearInterval(intervalID);
      }
      return;
    }

    intervalID = setInterval(() => {
      if (track.end_time <= playingAudio.currentTime) {
        clearInterval(intervalID);
        return;
      }

      let timeLength = track.end_time - track.start_time;
      let currentTimePosition = (Math.round(playingAudio.currentTime * 10) / 10) - track.start_time;

      this.setState({ unfillPercentage: (currentTimePosition / timeLength) * 100 });
    }, 100);

    this.setState({ intervalID: intervalID });
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
    let { track, episodeEndTime, isActive } = this.props;
    let { unfillPercentage } = this.state;

    if (unfillPercentage === void 0) {
      unfillPercentage = 100;
    }

    let padLeftPercent  = Math.round((track.start_time / episodeEndTime) * 100);
    let trackPercent    = Math.round((track.end_time / episodeEndTime) * 100) - padLeftPercent;
    let padRightPercent = 100 - padLeftPercent - trackPercent;

    let tags = this.getTags(track).map((tag) => {
      return <span key={tag} className="tag">{tag}</span>;
    });

    return (
      <div className={ isActive ? 'active' : '' }>
        <div className="tags">{tags}</div>
        <div className="pad"   style={{ width: `${padLeftPercent}%` }}></div>
        <div className="block" style={{ width: `${trackPercent}%` }}>
          <div className="unfill" style={{ width: `${unfillPercentage}%` }}></div>
          <div className="fill"   style={{ width: `${100 - unfillPercentage}%` }}></div>
        </div>
        <div className="pad"   style={{ width: `${padRightPercent}%` }}></div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingAudio  : state.pickApp.playingAudio
  };
})(TimeLineBlock);
