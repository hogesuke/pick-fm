import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { fetchEpisodes } from '../actions';

export default class EpisodeList extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchEpisodes(1)); // todo program_idの指定、ハードコーディングやめたい
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

export default connect(state => {
  return {
    episodes: state.pickApp.episodes
  }
})(EpisodeList);
