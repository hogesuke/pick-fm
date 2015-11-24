import React, { Component } from 'react';
import _ from 'underscore';
import $ from 'jquery';
import { connect } from 'react-redux';
import SideBar from './sidebar';
import Main from './main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { mainWidth: this.getMainWidth() };
  }
  handleResize() {
    this.setState({ mainWidth: this.getMainWidth() });
    cosole.debug(this.state.mainWidth);
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  getMainWidth() {
    let $window   = $(window);
    let window_x  = $window.width();
    let sidebar_x = 300;

    return window_x - sidebar_x - 20;
  }
  render() {
    return (
      <div>
        <SideBar />
        <Main width={this.state.mainWidth} />
      </div>
    );
  }
}

export default connect()(App);