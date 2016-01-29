import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuList from './MenuList';
import EpisodeList from './EpisodeList';

class SideBar extends Component {
  render() {
    return (
      <div id="sidebar">
        <MenuList />
        <EpisodeList programId={this.props.programId} />
      </div>
    );
  }
}

export default connect(state => {
  return {
    programId: state.pickApp.selectedProgramId
  };
})(SideBar);
