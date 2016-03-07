import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import LocationUtil from '../util/LocationUtil'

class BackPageLink extends Component {
  componentWillUpdate(nextProps) {
  }
  handleClick() {
    const { dispatch, backToLocation, backToQuery } = this.props;
    dispatch(pushState(null, backToLocation, backToQuery));
  }
  render() {
    const { backToLocation } = this.props;
    return (
      <div id="backpage-controller">
        <a onClick={this.handleClick.bind(this)}>
          <i className="fa fa-angle-left"></i> Back to {LocationUtil.getPageTitle(backToLocation)}
        </a>
      </div>
    );
  }
}

export default connect(state => {
  return {
    backToLocation: state.pickApp.backToLocation,
    backToQuery   : state.pickApp.backToQuery
  }
})(BackPageLink);
