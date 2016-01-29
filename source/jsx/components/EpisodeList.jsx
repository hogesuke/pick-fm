import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { fetchEpisodes } from '../actions';
import Episode from '../components/Episode';

export default class EpisodeList extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchEpisodes(this.props.programId));
  }
  render() {
    let episodes = _.map(this.props.episodes, (e) => {
      return <Episode episode={e} />;
    });

    return (
      <div id="episode-list">
        {episodes}
      </div>
    );
  }
}

EpisodeList.propTypes = {
  programId: (props, propName) => {
    if (!/^[1-9][0-9]*$/.test(props[propName])) {
      return new Error('Validation failed!');
    }
  }
};

export default connect(state => {
  return {
    episodes: state.pickApp.episodes
  }
})(EpisodeList);
