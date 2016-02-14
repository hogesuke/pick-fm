import React, { Component } from 'react';
import { connect } from 'react-redux';
import EpisodeList from '../components/EpisodeList';
import { setSelectedProgramId, fetchEpisodes } from '../actions';

class EpisodeListPage extends Component {
  componentWillMount() {
    let { programId } = this.props.params;

    this.props.dispatch(setSelectedProgramId(programId));
    this.props.dispatch(fetchEpisodes(programId));
  }
  render() {
    return <EpisodeList />;
  }
}

export default connect()(EpisodeListPage);
