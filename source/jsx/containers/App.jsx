import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPrograms, setSelectedProgramId, setVolume, setMuteStatus } from '../actions';
import SearchBox from '../components/SearchBox';
import Player from '../components/Player';

class App extends Component {
  componentWillMount() {
    const { dispatch, currentLocation } = this.props;

    dispatch(fetchPrograms());

    this.handleLocationChange(currentLocation);

    const volume = this.getSavedVolume();
    if (0 <= volume && volume <= 100) {
      dispatch(setVolume(volume));
    }
    const isMute = this.getSavedMuteStatus();
    if (isMute === true || isMute === false) {
      dispatch(setMuteStatus(isMute));
    }
  }
  componentWillUpdate(nextProps) {
    this.handleLocationChange(nextProps.currentLocation);
  }
  handleLocationChange(location) {
    const { dispatch } = this.props;

    let match = location.match(/^\/programs\/(.+?)\//);
    if (match) {
      dispatch(setSelectedProgramId(parseInt(match[1], 10)));
    }
  }
  getSavedVolume() {
    return parseInt(localStorage.getItem('pickfm.volume'), 10);
  }
  getSavedMuteStatus() {
    return JSON.parse(localStorage.getItem('pickfm.isMute'));
  }
  render() {
    return (
      <div id="main">
        <div id="header">
          <SearchBox />
        </div>
        <div id="main-body">
          {this.props.children}
        </div>
        <div id="footer">
          <Player />
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    currentLocation: state.router.location.pathname
  }
})(App);
