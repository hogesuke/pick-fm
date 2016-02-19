import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchOptions from './SearchOptions';
import Track from './Track';

class TrackList extends Component {
  getEpisode(track) {
    return this.props.episodes.find(function (e) {
      return e.program_id === track.program_id && e.episode_no === track.episode_no;
    });
  }
  render() {
    let tracks = this.props.tracks.map((track) => {
      let episode = this.getEpisode(track);
      return (
        <Track
          key={track.id}
          track={track}
          episode={episode}
        />
      );
    });

    return (
      <div id="track-list">
        <SearchOptions />
        {tracks}
      </div>
    );
  }
}

export default connect(state => {
  return {
    tracks    : state.pickApp.searchResultTracks,
    episodes  : state.pickApp.searchResultEpisodes,
    searchText: state.pickApp.searchText
  };
})(TrackList);

