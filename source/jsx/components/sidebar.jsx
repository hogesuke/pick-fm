import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayList from './playlist';

class SideBar extends Component {
  render() {
    return (
      <div id="sidebar">
        <PlayList />
      </div>
    );
  }
}

export default connect()(SideBar);
