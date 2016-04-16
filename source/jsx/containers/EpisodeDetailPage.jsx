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
    const { dispatch } = this.props;

    dispatch(setSelectedProgramId(programId));
    dispatch(fetchEpisode(programId, episodeNo, episodeType));
  }
  componentWillReceiveProps(nextProps) {
    const { programId, episodeNo, episodeType } = nextProps.params;
    const { dispatch, query, playingEpisode } = nextProps;
    const nextEpisodes = nextProps.episodes;
    const prevEpisodes = this.props.episodes;
    const nextLocation = nextProps.currentLocation;
    const prevLocation = this.props.currentLocation;

    if (nextLocation !== prevLocation) {
      // エピソード単体ページを開いている状態でプレイヤーのエピソードリンクから飛んできた場合
      dispatch(setSelectedProgramId(programId));
      dispatch(fetchEpisode(programId, episodeNo, episodeType));
      return;
    }

    if ((nextEpisodes[0] && nextEpisodes[0].id) === (prevEpisodes[0] && prevEpisodes[0].id)) {
      // play時にepisodesの参照が変わって再びpropsの変更が検知されてしまうため、
      // 同じエピソードであればここでリターン
      return;
    }
    if (!query.t || !/^([0-9]+m)?[0-5]?[0-9]s$/.test(query.t)) {
      // クエリで再生時間の指定がない場合は再生を開始させないのでここでリターン
      return;
    }
    if ((playingEpisode && playingEpisode.id) === (nextEpisodes[0] && nextEpisodes[0].id)) {
      // すでに再生されている場合はここでリターン
      return;
    }

    this.play(nextProps);
  }
  play(props) {
    const { dispatch, query, episodes } = props;

    let length = 0;

    if (/m/.test(query.t)) {
      const splited = query.t.split('m');
      length += parseInt(splited[0], 10) * 60 + parseInt(splited[1], 10);
    } else {
      length += parseInt(query.t, 10);
    }

    if (length > episodes[0].time_length) {
      return;
    }

    dispatch(initPlaying());
    setTimeout(() => {
      dispatch(generateAudio(episodes[0], null, length));
      dispatch(toggleActiveEpisode(episodes[0].id));
    }, 100);
  }
  render() {
    return <EpisodeList />;
  }
}

export default connect(state => {
    return {
      currentLocation: state.router.location.pathname,
      query          : state.router.location.query,
      episodes       : state.pickApp.episodes,
      playingEpisode : state.pickApp.playingEpisode
    };
  }
)(EpisodeDetailPage);
