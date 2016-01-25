import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../components/SideBar';
import SearchBox from '../components/SearchBox';
import TrackList from '../components/TrackList';
import Player from '../components/Player';

class ProgramPage extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <div id="main">
          <div id="tool-bar">
            <SearchBox />
          </div>
          <div id="main-body">
            <TrackList />
            <Player />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ProgramPage);
