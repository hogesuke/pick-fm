import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { fetchTracks } from '../actions';

class SearchBox extends Component {
  handleChange(event) {
    let { dispatch, currentLocation } = this.props;
    dispatch(fetchTracks(event.target.value));

    if (!/^\/search/.test(currentLocation)) {
      dispatch(pushState(null, '/search', ''));
    }
  }
  render() {
    return (
      <div>
        <input type="text" id="search-box" onChange={this.handleChange.bind(this)} placeholder="&#xf002;" />
      </div>
    );
  }
}

export default connect(state => {
  return {
    currentLocation: state.router.location.pathname
  }
})(SearchBox);
