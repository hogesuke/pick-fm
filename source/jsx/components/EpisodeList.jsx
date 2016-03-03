import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Episode from './Episode';
import Paging from './Paging';

export default class EpisodeList extends React.Component {
  render() {
    let { episodes } = this.props;
    let episodeDoms = episodes.map((e) => {
      return <Episode key={e.id} episode={e} />;
    });

    return (
      <div id="episode-list">
        <Paging />
        {episodeDoms}
        <Paging />
      </div>
    );
  }
}

export default connect(state => {
  return {
    episodes: state.pickApp.episodes
  }
})(EpisodeList);
