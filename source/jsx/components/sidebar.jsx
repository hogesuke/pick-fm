import React, { Component } from 'react';
import { connect } from 'react-redux';

class SideBar extends Component {
  render() {
    return (
      <div id="sidebar">
      </div>
    );
  }
}

export default connect()(SideBar);
