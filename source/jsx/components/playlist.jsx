import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import Player from './player';
import Track from './track';

export default class PlayList extends React.Component {
  render() {
    let tracks = _.map(this.props.playListTracks, (track) => {
      return <Track track={track} />;
    });

    return (
      <div id="play-list">
        <Player playingTrack={this.props.playingTrack} />
        {tracks}
      </div>
    );
  }
}

export default connect(state => {
  return {
    playListTracks: state.pickApp.playListTracks,
    playingTrack  : _.last(state.pickApp.playListTracks)
  }
})(PlayList);
