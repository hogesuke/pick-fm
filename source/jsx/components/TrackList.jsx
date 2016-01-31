import React, { Component } from 'react';
import { connect } from 'react-redux';
import Track from './Track';
import { fetchTracks } from '../actions';

class TrackList extends Component {
  componentWillMount() {
    this.props.dispatch(fetchTracks('ruby'));
  }
  getEpisode(track) {
    return this.props.episodes.find(function (e) {
      return e.program_id === track.program_id && e.episode_no === track.episode_no;
    });
  }
  render() {
    let tracks = this.props.tracks.map((track) => {
      return (
        <Track
          key={track.id}
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

