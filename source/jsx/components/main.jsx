import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from './searchbox';
import TrackList from './tracklist';
import Player from './player';

class Main extends Component {
  render() {
    return (
      <div id="main">
        <div id="tool-bar">
          <SearchBox />
        </div>
        <div id="main-body">
          <TrackList />
          <Player />
        </div>
      </div>
    );
  }
}


export default connect()(Main);
