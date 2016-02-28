import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayingAudio, setAudioIntervalID, setAudioCurrentTime, setIsPlaying, resetPlaying } from '../actions'
import PlayToggleButtonForPlayer from './PlayToggleButtonForPlayer';
import TimeBar from './TimeBar';
import Volume from './Volume';

class Player extends Component {
  componentWillReceiveProps(nextProps) {
    let { dispatch } = this.props;
    let { playingTrack, playingEpisode } = nextProps;

    if (!playingEpisode) { return; }

    if (this.audio) {
      this.audio.pause();
    }

    let audio = this.audio = new Audio();
    audio.src = playingEpisode.url;

    if (playingTrack) {
      // track再生の場合
      audio.currentTime = playingTrack.start_time;
    }

    audio.play();
    dispatch(setPlayingAudio(audio));

    const intervalID = setInterval(() => {
      let currentTime = audio.currentTime;

      if (this.isEnd(currentTime)) {
        audio.pause();
        dispatch(resetPlaying());
        return;
      }

      dispatch(setAudioCurrentTime(currentTime));
    }, 1000);

    dispatch(setAudioIntervalID(intervalID));

    audio.addEventListener('playing', () => {
      dispatch(setIsPlaying(true));
    });
    audio.addEventListener('pause', () => {
      dispatch(setIsPlaying(false));
    });
    audio.addEventListener('ended', () => {
      dispatch(resetPlaying());
    });
  }
  isEnd(currentTime) {
    const { playingTrack } = this.props;

    if (playingTrack) {
      // track再生の場合
      return this.props.playingTrack.end_time <= currentTime;
    }
    // episode再生の場合
    return false;
  }
  getTitle() {
    const episode = this.props.playingEpisode;

    if (!episode) {
      return '';
    }

    let type = episode.episode_type.charAt(0).toUpperCase() + episode.episode_type.slice(1);
    type = type === 'Regular' ? '' : ' ' + type;

    return `${episode.program.name} Episode ${episode.episode_no + type}`;
  }
  render() {
    return (
      <div id="player">
        <div className="controllers">
          <PlayToggleButtonForPlayer />
          <Volume />
        </div>
        <div className="track-info">
          <span>{this.getTitle()}</span>
        </div>
        <TimeBar />
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingTrack  : state.pickApp.playingTrack,
    playingEpisode: state.pickApp.playingEpisode
  }
})(Player);
