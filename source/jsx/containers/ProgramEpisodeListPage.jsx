import React, { Component } from 'react';
import { connect } from 'react-redux';
import EpisodeList from '../components/EpisodeList';
import { fetchProgramEpisodes } from '../actions';

class ProgramEpisodeListPage extends Component {
  componentWillMount() {
    let { programId } = this.props.params;

    this.props.dispatch(fetchProgramEpisodes(programId));
  }
  render() {
    return <EpisodeList />;
  }
}

export default connect()(ProgramEpisodeListPage);
