import React, { Component } from 'react';
import { connect } from 'react-redux';
import EpisodeList from '../components/EpisodeList';
import { fetchEpisode, setSelectedProgramId } from '../actions';

class EpisodeDetailPage extends Component {
  componentWillMount() {
    let { programId, episodeNo, episodeType } = this.props.params;

    this.props.dispatch(setSelectedProgramId(programId));
    this.props.dispatch(fetchEpisode(programId, episodeNo, episodeType));
  }
  render() {
    return <EpisodeList />;
  }
}

export default connect()(EpisodeDetailPage);
