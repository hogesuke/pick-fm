import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { fetchEpisodes } from '../actions';

export default class EpisodeList extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchEpisodes(this.props.programId));
  }
  render() {
    let episodes = _.map(this.props.episodes, (e) => {
      return (
        <div className="episode">
          <div className="head">
            <span className="title">{e.program.name} Episode {e.episode_no}</span>
          </div>
        </div>
      );
    });

    return (
      <div id="episode-list">
        {episodes}
      </div>
    );
  }
}

EpisodeList.propTypes = {
  programId: PropTypes.number.isRequired
};

export default connect(state => {
  return {
    episodes: state.pickApp.episodes
  }
})(EpisodeList);
