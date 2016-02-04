import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import EpisodeList from '../components/EpisodeList';
import Player from '../components/Player';
import { setSelectedProgramId, fetchEpisodes } from '../actions';

class EpisodeListPage extends Component {
  componentWillMount() {
    let { programId } = this.props.params;

    this.props.dispatch(setSelectedProgramId(programId));
    this.props.dispatch(fetchEpisodes(programId));
  }
  render() {
    return (
      <div>
        <div id="main">
          <div id="tool-bar">
            <SearchBox />
          </div>
          <div id="main-body">
            <EpisodeList />
            <Player />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(EpisodeListPage);
