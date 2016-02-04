import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import {
  SET_SELECTED_PROGRAM_ID,
  SET_SELECTED_EPISODE_ID,
  SET_PLAYING_TRACK,
  SET_PLAYING_EPISODE,
  SET_PLAYING_AUDIO,
  SET_IS_PLAYING,
  FETCH_PROGRAMS,
  FETCH_TRACKS,
  FETCH_EPISODES,
  FETCH_EPISODE
} from './actions';

let initialState = {
  searchResultTracks  : [],
  searchResultEpisodes: [],
  programs            : [],
  episodes            : [],
  selectedProgramId   : null,
  selectedEpisodeId   : null,
  playingTrack        : null,
  playingEpisode      : null,
  playingAudio        : null,
  isPlaying           : false,
  searchText          : ''
};

function pickApp(state = initialState, action = "") {
  switch (action.type) {
    case SET_SELECTED_PROGRAM_ID:
      return Object.assign({}, state, {
        selectedProgramId: action.id
      });
    case SET_SELECTED_EPISODE_ID:
      return Object.assign({}, state, {
        selectedEpisodeId: action.id
      });
    case SET_PLAYING_TRACK:
      return Object.assign({}, state, {
        playingTrack: action.track
      });
    case SET_PLAYING_EPISODE:
      return Object.assign({}, state, {
        playingEpisode: action.episode
      });
    case SET_PLAYING_AUDIO:
      return Object.assign({}, state, {
        playingAudio: action.audio
      });
    case SET_IS_PLAYING:
      return Object.assign({}, state, {
        isPlaying: action.isPlaying
      });
    case FETCH_PROGRAMS:
      return Object.assign({}, state, {
        programs: action.programs
      });
    case FETCH_TRACKS:
      return Object.assign({}, state, {
        searchResultTracks: action.tracks,
        searchResultEpisodes: action.episodes,
        searchText: action.searchText
      });
    case FETCH_EPISODES:
      return Object.assign({}, state, {
        episodes: action.episodes
      });
    case FETCH_EPISODE:
      return Object.assign({}, state, {
        episodes: [action.episode]
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  pickApp,
  router
});

export default rootReducer;
