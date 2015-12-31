import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';

class TimeBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isPlaying: false };
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect()(TimeBar);