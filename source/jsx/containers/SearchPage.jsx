import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackList from '../components/TrackList';
import { setPage } from '../actions';

class SearchPage extends Component {
  componentWillMount() {
    debugger;
    const { dispatch, query } = this.props;
    const page = query.page ? parseInt(query.page, 10) : 1;

    dispatch(setPage(page));
  }
  render() {
    return <TrackList />;
  }
}

export default connect(state => {
  return {
    query: state.router.location.query
  }
})(SearchPage);
