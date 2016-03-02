import React, { Component } from 'react';
import { connect } from 'react-redux';
import EpisodeList from '../components/EpisodeList';
import { fetchProgramEpisodes } from '../actions';

class ProgramEpisodeListPage extends Component {
  componentWillMount() {
    this.fetchEpisodes();
  }
  componentWillUpdate() {
    this.fetchEpisodes();
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
    page: state.router.location.query.page
  }
})(ProgramEpisodeListPage);
