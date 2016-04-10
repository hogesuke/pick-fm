import React, { Component } from 'react';
import { connect } from 'react-redux';
import EpisodeList from '../components/EpisodeList';
import { fetchEpisode, setSelectedProgramId, initPlaying, generateAudio, toggleActiveEpisode } from '../actions';

class EpisodeDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = { firstTime: true };
  }
  componentWillMount() {
    const { programId, episodeNo, episodeType } = this.props.params;

    this.props.dispatch(setSelectedProgramId(programId));
    this.props.dispatch(fetchEpisode(programId, episodeNo, episodeType));
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, query } = nextProps;
    const nextEpisodes = nextProps.episodes;
    const prevEpisodes = this.props.episodes;

    if (!this.state.firstTime) {
      return;
    }

    this.setState({ firstTime: false });

    if (nextEpisodes === prevEpisodes) {
      return;
    }
    if (!query.t || !/^([0-9]+m)?[0-5]?[0-9]s$/.test(query.t)) {
      return;
    }

    let length = 0;

    if (/m/.test(query.t)) {
      const splited = query.t.split('m');
      length += parseInt(splited[0], 10) * 60 + parseInt(splited[1], 10);
    } else {
      length += parseInt(query.t, 10);
    }

    if (length > nextEpisodes[0].time_length) {
      return;
    }

    dispatch(initPlaying());
    setTimeout(() => {
      dispatch(generateAudio(nextEpisodes[0], null, length));
      dispatch(toggleActiveEpisode(nextEpisodes[0].id));
    }, 100);
  }
  render() {
    return <EpisodeList />;
  }
}

export default connect(state => {
    return {
      episodes: state.pickApp.episodes,
      query   : state.router.location.query
    };
  }
)(EpisodeDetailPage);
