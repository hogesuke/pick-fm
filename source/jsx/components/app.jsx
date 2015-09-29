import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import Player from './player';
import PlayList from './playlist';
import SearchBox from './searchbox';
import TrackList from './tracklist';
import { searchTracks, fetchTracks } from '../actions'

class App extends Component {
  render() {
    return (
      <div>
        <Player playingTrack={this.props.playingTrack} />
        <SearchBox onChange={text => this.props.dispatch(fetchTracks(text))} />
        <PlayList />
        <TrackList onLoad={text => this.props.dispatch(fetchTracks(text))} />
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingTrack: _.last(state.pickApp.playListTracks)
  };
})(App);