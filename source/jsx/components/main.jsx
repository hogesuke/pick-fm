import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from './searchbox';
import TrackList from './tracklist';
import { fetchTracks } from '../actions';

class Main extends Component {
  render() {
    return (
      <div id="main" style={{ width: this.props.width }}>
        <div id="tool-bar"></div>
        <div id="main-container">
          <SearchBox onChange={text => this.props.dispatch(fetchTracks(text))} />
          <TrackList onLoad={text => this.props.dispatch(fetchTracks(text))} />
        </div>
      </div>
    );
  }
}

export default connect()(Main);
