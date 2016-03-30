import React, { Component } from 'react';
import { connect } from 'react-redux';
import EpisodeList from '../components/EpisodeList';
import { fetchGuestEpisodes, setPage } from '../actions';

class GuestEpisodeListPage extends Component {
  componentWillMount() {
    const { dispatch, params, query } = this.props;
    const page = query.page ? parseInt(query.page, 10) : 1;

    dispatch(setPage(page));
    dispatch(fetchGuestEpisodes(params.guestId));
  }
  componentWillUpdate(nextProps) {
    const { dispatch, params } = nextProps;
    const nextLocation = nextProps.currentLocation;
    const prevLocation = this.props.currentLocation;
    const nextPage = nextProps.currentPage;
    const prevPage = this.props.currentPage;
    const nextSort = nextProps.sort;
    const prevSort = this.props.sort;

    if (nextLocation !== prevLocation || nextPage !== prevPage || nextSort !== prevSort) {
      dispatch(fetchGuestEpisodes(params.guestId));
    }
  }
  render() {
    return <EpisodeList />;
  }
}

export default connect(state => {
  return {
    query: state.router.location.query,
    currentLocation: state.router.location.pathname,
    currentPage    : state.pickApp.currentPage,
    sort           : state.pickApp.sort
  }
})(GuestEpisodeListPage);
