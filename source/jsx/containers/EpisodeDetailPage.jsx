import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../components/SideBar';
import SearchBox from '../components/SearchBox';
import Episode from '../components/Episode';
import Player from '../components/Player';
import { setSelectedProgramId, setSelectedEpisodeId } from '../actions';

class EpisodeDetailPage extends Component {
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
        <SideBar />
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

//EpisodeDetailPage.defaultProps = {
//  params: {
//    programId: 1,
//    episodeId: 1
//  }
//};

export default connect()(EpisodeDetailPage);
