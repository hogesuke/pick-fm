import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import LocationUtil from '../util/LocationUtil'

class PageTitle extends Component {
  render() {
    const { currentLocation } = this.props;
    return (
      <div id="page-title">
        {LocationUtil.getPageTitle(currentLocation)}
      </div>
    );
  }
}

export default connect(state => {
  return {
    currentLocation: state.router.location.pathname
  }
})(PageTitle);
