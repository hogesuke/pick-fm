import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchOptions from './SearchOptions';
import Track from './Track';
import Paging from './Paging';
import Sorter from './Sorter';
import NotFound from './NotFound';

class TrackList extends Component {
  getEpisode(track) {
    return this.props.episodes.find(function (e) {
      return e.program_id === track.program_id && e.episode_no === track.episode_no;
    });
  }
  render() {
    const { total, searchText } = this.props;
    const tracks = this.props.tracks.map((track) => {
      const episode = this.getEpisode(track);
      return (
        <Track
          key={track.id}
          track={track}
          episode={episode}
        />
      );
    });
    const pagingDom = total > 0 ?  <Paging /> : null;
    const sorterDom = total > 0 ?  <Sorter /> : null;
    const notfound  = <NotFound searchText={searchText} />;

    return (
      <div id="track-list">
        <SearchOptions />
        { sorterDom }
        { pagingDom }
        { tracks.length > 0 ? tracks : notfound }
        { pagingDom }
      </div>
    );
  }
}

export default connect(state => {
  return {
    tracks    : state.pickApp.searchResultTracks,
    episodes  : state.pickApp.searchResultEpisodes,
    searchText: state.pickApp.searchText,
    total     : state.pickApp.total
  };
})(TrackList);

