import React, { Component } from 'react';
import { connect } from 'react-redux';
import EpisodeList from '../components/EpisodeList';
import { fetchProgramEpisodes, setPage } from '../actions';

class ProgramEpisodeListPage extends Component {
  componentWillMount() {
    const { dispatch, query } = this.props;
    const page = query.page ? parseInt(query.page, 10) : 1;

    dispatch(setPage(page));
    this.fetchEpisodes();
  }
  componentWillUpdate(nextProps) {
    const nextPage = nextProps.currentPage;
    const prevPage = this.props.currentPage;
    const nextSort = nextProps.sort;
    const prevSort = this.props.sort;

    if (nextPage !== prevPage || nextSort !== prevSort) {
      this.fetchEpisodes();
    }
  }
  fetchEpisodes() {
    let { programId } = this.props.params;
    this.props.dispatch(fetchProgramEpisodes(programId));
  }
  render() {
    return <EpisodeList />;
  }
}

export default connect(state => {
  return {
    query: state.router.location.query,
    currentPage: state.pickApp.currentPage,
    sort       : state.pickApp.sort
  }
})(ProgramEpisodeListPage);
