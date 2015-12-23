import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuList from './menulist';
import PlayList from './playlist';

class SideBar extends Component {
  render() {
    return (
      <div id="sidebar">
        <MenuList />
        <PlayList />
      </div>
    );
  }
}

export default connect()(SideBar);
