import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPrograms, setSelectedProgramId } from '../actions';
import SearchBox from '../components/SearchBox';
import Player from '../components/Player';

class App extends Component {
  componentWillMount() {
    const { dispatch, currentLocation } = this.props;

    dispatch(fetchPrograms());
    this.handleLocationChange(currentLocation);
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
  render() {
    let { currentLocation } = this.props;
    let player = /^\/$/.test(currentLocation) ? null : <Player />;

    return (
      <div id="main">
        <div id="tool-bar">
          <SearchBox />
        </div>
        <div id="main-body">
          {this.props.children}
        </div>
        {player}
      </div>
    );
  }
}

export default connect(state => {
  return {
    currentLocation: state.router.location.pathname
  }
})(App);
