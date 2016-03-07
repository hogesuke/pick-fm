import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Episode from './Episode';
import PageTitle from './PageTitle';
import Paging from './Paging';
import Sorter from './Sorter';
import LocationUtil from '../util/LocationUtil'

export default class EpisodeList extends React.Component {
  visibleController(location) {
    const { total } = this.props;
    return 0 < total && (LocationUtil.isProgramEpisodesPage(location) || LocationUtil.isGuestEpisodePage(location));
  }
  render() {
    const { episodes, currentLocation } = this.props;
    const episodeDoms = episodes.map((e) => {
      return <Episode key={e.id} episode={e} />;
    });
    const pagingDom = this.visibleController(currentLocation) ?  <Paging /> : null;
    const sorterDom = this.visibleController(currentLocation) ?  <Sorter /> : null;

    return (
      <div id="episode-list">
        <PageTitle />
        {pagingDom}
        {sorterDom}
        {episodeDoms}
        {pagingDom}
      </div>
    );
  }
}

export default connect(state => {
  return {
    episodes: state.pickApp.episodes,
    total   : state.pickApp.total,
    currentLocation: state.router.location.pathname
  }
})(EpisodeList);
