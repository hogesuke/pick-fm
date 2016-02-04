import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import EpisodeList from '../components/EpisodeList';
import Player from '../components/Player';
import { fetchEpisode, setSelectedProgramId } from '../actions';

class EpisodeDetailPage extends Component {
  componentWillMount() {
    let { programId, episodeNo, episodeType } = this.props.params;

    this.props.dispatch(setSelectedProgramId(programId));
    this.props.dispatch(fetchEpisode(programId, episodeNo, episodeType));
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

export default connect()(EpisodeDetailPage);
