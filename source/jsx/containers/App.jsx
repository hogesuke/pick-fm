import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Player from '../components/Player';

class App extends Component {
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
