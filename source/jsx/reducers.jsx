import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import {
  SET_PLAYING_TRACK,
  SET_PLAYING_AUDIO,
  FETCH_TRACKS,
  FETCH_EPISODES
} from './actions';

let initialState = {
  searchResultTracks  : [],
  searchResultEpisodes: [],
  episodes            : [],
  playingTrack  : null,
  playingEpisode: null,
  playingAudio  : null,
  searchText    : ''
};

function pickApp(state = initialState, action = "") {
  switch (action.type) {
    case SET_PLAYING_TRACK:
      return Object.assign({}, state, {
        playingTrack: action.track,
        playingEpisode: action.episode
      });
    case SET_PLAYING_AUDIO:
      return Object.assign({}, state, {
        playingAudio: action.audio
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
