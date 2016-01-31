import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEpisodes } from '../actions';
import Episode from '../components/Episode';

export default class EpisodeList extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchEpisodes(this.props.programId));
  }
  render() {
    let episodes = this.props.episodes.map((e) => {
      return <Episode key={e.id} episode={e} />;
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
