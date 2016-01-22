import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import Track from './track';
import { setPlayingTrack } from '../actions'

class TrackList extends Component {
  componentWillMount() {
    this.props.onLoad('Ruby');
  }
  render() {
    let tracks = _.map(this.props.tracks, (track) => {
      return (
        <Track
          onPlayClick={track => this.props.dispatch(setPlayingTrack(track))}
          track={track} episodeTracks={track.episode_tracks}
        />
      );
    });

    return  <div id="track-list">{tracks}</div>;
  }
}

export default connect(state => {
  return {
    tracks: state.pickApp.tracks
  };
})(TrackList);

