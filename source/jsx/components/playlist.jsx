import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import Track from './track';

export default class PlayList extends React.Component {
  render() {
    let tracks = _.map(this.props.playListTracks, (track) => {
      return <Track track={track} />;
    });

    return (
      <div id="play-list">{tracks}</div>
    );
  }
}

export default connect(state => {
  return {
    playListTracks: state.pickApp.playListTracks
  }
})(PlayList);
