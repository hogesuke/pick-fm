import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuList from './menulist';
import EpisodeList from './episodelist';

class SideBar extends Component {
  render() {
    return (
      <div id="sidebar">
        <MenuList />
        <EpisodeList />
      </div>
    );
  }
}

export default connect()(SideBar);
