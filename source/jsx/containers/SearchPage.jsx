import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import TrackList from '../components/TrackList';
import Player from '../components/Player';

class SearchPage extends Component {
  render() {
    return (
      <div id="main">
        <div id="tool-bar">
          <SearchBox />
        </div>
        <div id="main-body">
          <TrackList />
        </div>
        <Player />
      </div>
    );
  }
}


export default connect()(SearchPage);
