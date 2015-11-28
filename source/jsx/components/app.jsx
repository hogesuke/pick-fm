import React, { Component } from 'react';
import _ from 'underscore';
import $ from 'jquery';
import { connect } from 'react-redux';
import SideBar from './sidebar';
import Main from './main';

class App extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <Main />
      </div>
    );
  }
}

export default connect()(App);