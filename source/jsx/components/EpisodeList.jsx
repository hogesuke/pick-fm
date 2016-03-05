import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Episode from './Episode';
import Paging from './Paging';
import LocationUtil from '../util/LocationUtil'

export default class EpisodeList extends React.Component {
  render() {
    const { episodes, currentLocation } = this.props;
    const episodeDoms = episodes.map((e) => {
      return <Episode key={e.id} episode={e} />;
    });
    const pagingDom = LocationUtil.isProgramEpisodesPage(currentLocation) ?  <Paging /> : null;

    return (
      <div id="episode-list">
        {pagingDom}
        {episodeDoms}
        {pagingDom}
      </div>
    );
  }
}

export default connect(state => {
  return {
    episodes: state.pickApp.episodes,
    currentLocation: state.router.location.pathname
  }
})(EpisodeList);
