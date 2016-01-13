import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import Track from './track';
import { addTrackToPlayList } from '../actions'

class TrackList extends Component {
  componentWillMount() {
    this.props.onLoad('Ruby');
  }
  render() {
    let tracks = _.map(this.props.tracks, (track) => {
      let source = track._source;
      let episodeTracks = _.pluck(track._episode_tracks.hits, '_source');

      return (
        <Track
          onAddClick={source => this.props.dispatch(addTrackToPlayList(source))}
          track={source} episodeTracks={episodeTracks}
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

