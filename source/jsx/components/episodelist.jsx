import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import Player from './player';
import Track from './track';

export default class EpisodeList extends React.Component {
  render() {
    let tracks = _.map(this.props.episodeListTracks, (track) => {
      return <Track track={track} />;
    });

    return (
      <div id="play-list">
        <Player />
        {tracks}
      </div>
    );
  }
}

export default connect(state => {
  return {
    episodeListTracks: state.pickApp.episodeListTracks
  }
})(EpisodeList);
