import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  getAudioUrl() {
    let track = this.props.playingTrack;
    //return track.url + '#t=' + track.start_time + ',' + track.end_time;
    return track.url;
  }
  componentDidUpdate() {
    let track = this.props.playingTrack;
    if (track) {
      let audio = React.findDOMNode(this.refs.player);
      audio.currentTime = track.start_time;
      audio.play();
    }
  }
  render() {
    if (!this.props.playingTrack) {
      return (
        <div>再生するエピソードを選んでください</div>
      );
    }

    return (
      <div>
        <audio ref="player" className="player" src={this.getAudioUrl()} controls></audio>
      </div>
    );
  }
}

export default connect()(Player);
