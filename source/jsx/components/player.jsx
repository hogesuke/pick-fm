import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  componentDidMount() {
    new MediaElementPlayer('.player');
  }
  render() {
    return (
      <div>
        <audio className="player" src="http://cache.rebuild.fm/podcast-ep108.mp3">hoge</audio>
      </div>
    );
  }
}

export default connect()(Player);
