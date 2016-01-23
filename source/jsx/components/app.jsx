import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from './sidebar';
import Main from './main';

class App extends Component {
  render() {
    return (
      <div>
        <SideBar />
        {this.props.children}
      </div>
    );
  }
}

export default connect()(App);