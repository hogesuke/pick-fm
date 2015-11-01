import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from './player';
import PlayList from './playlist';

class SideBar extends Component {
  render() {
    return (
      <div id="sidebar">
        <Player playingTrack={this.props.playingTrack} />
        <PlayList />
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingTrack: _.last(state.pickApp.playListTracks)
  };
})(SideBar);
