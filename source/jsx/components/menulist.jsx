import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class MenuList extends React.Component {
  render() {
    return (
      <div id="menu-list"></div>
    );
  }
}

export default connect()(MenuList);
