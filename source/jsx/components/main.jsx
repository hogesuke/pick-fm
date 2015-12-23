import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from './player';
import SearchBox from './searchbox';
import TrackList from './tracklist';
import { fetchTracks } from '../actions';

class Main extends Component {
  render() {
    return (
      <div id="main">
        <div id="tool-bar">
          <Player playingTrack={this.props.playingTrack} />
          <SearchBox onChange={text => this.props.dispatch(fetchTracks(text))} />
        </div>
        <div id="main-body">
          <TrackList onLoad={text => this.props.dispatch(fetchTracks(text))} />
        </div>
      </div>
    );
  }
}


export default connect(state => {
  return {
    playingTrack: _.last(state.pickApp.playListTracks)
  };
})(Main);
