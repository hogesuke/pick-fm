import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { fetchTracks, addFilterProgram } from '../actions';

class SearchBox extends Component {
  handleChange(event) {
    let { dispatch, currentLocation, filterPrograms, selectedProgramId } = this.props;

    if (event.target.value.length < 2) {
      return;
    }

    if (/^\/programs\/[0-9]+\/episodes/.test(currentLocation)) {
      dispatch(pushState(null, '/search', ''));

      if (!_.contains(filterPrograms, selectedProgramId)) {
        dispatch(addFilterProgram(selectedProgramId));
      }
    }

    dispatch(fetchTracks(event.target.value));
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
    currentLocation  : state.router.location.pathname,
    filterPrograms   : state.pickApp.filterPrograms,
    selectedProgramId: state.pickApp.selectedProgramId
  }
})(SearchBox);
