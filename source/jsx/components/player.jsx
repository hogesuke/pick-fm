import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  componentDidMount() {
    //new MediaElementPlayer('.player');
  }
  render() {
    return (
      <div>
        <div className="player">hoge</div>
      </div>
    );
  }
}

export default connect()(Player);
