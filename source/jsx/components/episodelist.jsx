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
      return <div>{e.episode_no}</div>;
    });

    return (
      <div id="play-list">
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
