import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  getAudioUrl() {
    var track = this.props.playingTrack;
    return track.url + '#t=' + track.start_time + ',' + track.end_time;
  }
  render() {
    if (!this.props.playingTrack) {
      return (
        <div>再生するエピソードを選んでください</div>
      );
    }

    return (
      <div>
        <audio className="player" src={this.getAudioUrl()} controls></audio>
      </div>
    );
  }
}

export default connect()(Player);
