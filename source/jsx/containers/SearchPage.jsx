import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackList from '../components/TrackList';

class SearchPage extends Component {
  render() {
    return <TrackList />;
  }
}

export default connect()(SearchPage);
