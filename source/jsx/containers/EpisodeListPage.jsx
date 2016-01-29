import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Episode from '../components/Episode';
import Player from '../components/Player';
import { setSelectedProgramId, setSelectedEpisodeId } from '../actions';

class EpisodeListPage extends Component {
  componentWillMount() {
    this.setSelectedProgramId(this.props.params.programId);
    this.setSelectedEpisodeId(this.props.params.episodeId);
  }
  componentWillReceiveProps(nextProps) {
    this.setSelectedProgramId(nextProps.params.programId);
    this.setSelectedEpisodeId(this.props.params.episodeId);
  }
  setSelectedProgramId(id) {
    this.props.dispatch(setSelectedProgramId(id));
  }
  setSelectedEpisodeId(id) {
    this.props.dispatch(setSelectedEpisodeId(id));
  }
  render() {
    return (
      <div>
        <div id="main">
          <div id="tool-bar">
            <SearchBox />
          </div>
          <div id="main-body">
            <Episode />
            <Player />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(EpisodeListPage);
