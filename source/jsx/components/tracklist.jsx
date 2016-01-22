import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import Track from './track';
import { setPlayingTrack } from '../actions'

class TrackList extends Component {
  componentWillMount() {
    this.props.onLoad('Ruby');
  }
  getEpisode(track) {
    return this.props.episodes.find(function (e) {
      return e.program_id === track.program_id && e.episode_no === track.episode_no;
    });
  }
  render() {
    let tracks = _.map(this.props.tracks, (track) => {
      return (
        <Track
          onPlayClick={track => this.props.dispatch(setPlayingTrack(track))}
          track={track}
          episodeTracks={track.episode_tracks}
          episode={this.getEpisode(track)}
        />
      );
    });

    return  <div id="track-list">{tracks}</div>;
  }
}

export default connect(state => {
  return {
    tracks  : state.pickApp.searchResultTracks,
    episodes: state.pickApp.searchResultEpisodes
  };
})(TrackList);

