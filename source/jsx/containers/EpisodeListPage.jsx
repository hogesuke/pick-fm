import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import EpisodeList from '../components/EpisodeList';
import Player from '../components/Player';
import { setSelectedProgramId, setSelectedEpisodeId } from '../actions';

class EpisodeListPage extends Component {
  componentWillMount() {
    this.setSelectedProgramId(this.props.params.programId);
  }
  componentWillReceiveProps(nextProps) {
    this.setSelectedProgramId(nextProps.params.programId);
  }
  setSelectedProgramId(id) {
    this.props.dispatch(setSelectedProgramId(id));
  }
  render() {
    return (
      <div>
        <div id="main">
          <div id="tool-bar">
            <SearchBox />
          </div>
          <div id="main-body">
            <EpisodeList programId={this.props.params.programId} />
            <Player />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(EpisodeListPage);
