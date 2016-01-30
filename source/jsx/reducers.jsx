import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import {
  SET_SELECTED_PROGRAM_ID,
  SET_SELECTED_EPISODE_ID,
  SET_PLAYING_TRACK,
  SET_PLAYING_AUDIO,
  FETCH_PROGRAMS,
  FETCH_TRACKS,
  FETCH_EPISODES
} from './actions';

let initialState = {
  searchResultTracks  : [],
  searchResultEpisodes: [],
  programs            : [],
  episodes            : [],
  selectedProgramId: null,
  selectedEpisodeId: null,
  playingTrack     : null,
  playingEpisode   : null,
  playingAudio     : null,
  searchText       : ''
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
        playingTrack: action.track,
        playingEpisode: action.episode
      });
    case SET_PLAYING_AUDIO:
      return Object.assign({}, state, {
        playingAudio: action.audio
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
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  pickApp,
  router
});

export default rootReducer;
