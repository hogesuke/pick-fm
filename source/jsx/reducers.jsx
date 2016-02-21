import _ from 'underscore';
import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import {
  SET_SELECTED_PROGRAM_ID,
  SET_SELECTED_EPISODE_ID,
  SET_PLAYING_TRACK,
  SET_PLAYING_EPISODE,
  SET_PLAYING_AUDIO,
  SET_IS_PLAYING,
  SET_AUDIO_INTERVAL_ID,
  SET_AUDIO_CURRENT_TIME,
  ADD_FILTER_PROGRAM,
  REMOVE_FILTER_PROGRAM,
  ADD_FILTER_GUEST,
  TOGGLE_ACTIVE_TRACK,
  TOGGLE_ACTIVE_EPISODE,
  INIT_PLAYING,
  FETCH_PROGRAMS,
  FETCH_TRACKS,
  CLEAR_TRACKS,
  FETCH_EPISODES,
  FETCH_EPISODE,
  FETCH_GUESTS
} from './actions';

let initialState = {
  searchResultTracks  : [],
  searchResultEpisodes: [],
  programs            : [],
  episodes            : [],
  guests              : [],
  selectedProgramId   : null,
  selectedEpisodeId   : null,
  playingTrack        : null,
  playingEpisode      : null,
  playingAudio        : null,
  audioIntervalID     : null,
  audioCurrentTime    : null,
  isPlaying           : false,
  searchText          : '',
  filterPrograms      : [],
  filterGuests        : []
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
    case SET_AUDIO_INTERVAL_ID:
      return Object.assign({}, state, {
        audioIntervalID: action.intervalID
      });
    case SET_AUDIO_CURRENT_TIME:
      return Object.assign({}, state, {
        audioCurrentTime: action.currentTime
      });
    case TOGGLE_ACTIVE_TRACK:
      let toggledTracks = state.searchResultTracks.map((t) => {
        if (t.id === action.id) {
          t.isActive = !t.isActive;
        } else {
          t.isActive = false;
        }
        return t;
      });
      return Object.assign({}, state, {
        searchResultTracks: toggledTracks
      });
    case TOGGLE_ACTIVE_EPISODE:
      let toggledEpisodes = state.episodes.map((e) => {
        if (e.id === action.id) {
          e.isActive = !e.isActive;
        } else {
          e.isActive = false;
        }
        return e;
      });
      return Object.assign({}, state, {
        episodes: toggledEpisodes
      });
    case INIT_PLAYING:
      if (state.audioIntervalID) {
        clearInterval(state.audioIntervalID);
      }
      let inactiveTracks = state.searchResultTracks.map((t) => {
        t.isActive = false;
        return t;
      });
      let inactiveEpisodes = state.episodes.map((e) => {
        e.isActive = false;
        return e;
      });
      return Object.assign({}, state, {
        playingAudio      : null,
        playingTrack      : null,
        playingEpisode    : null,
        audioIntervalID   : null,
        audioCurrentTime  : null,
        isPlaying         : false,
        searchResultTracks: inactiveTracks,
        episodes          : inactiveEpisodes
      });
    case FETCH_PROGRAMS:
      return Object.assign({}, state, {
        programs: action.programs
      });
    case FETCH_TRACKS:
      action.tracks.map((t) => {
        t.isActive = false;
      });
      return Object.assign({}, state, {
        searchResultTracks  : action.tracks,
        searchResultEpisodes: action.episodes,
        searchText: action.searchText
      });
    case CLEAR_TRACKS:
      return Object.assign({}, state, {
        searchResultTracks  : [],
        searchResultEpisodes: [],
        searchText: ''
      });
    case FETCH_EPISODES:
      action.episodes.map((e) => {
        e.isActive = false;
      });
      return Object.assign({}, state, {
        episodes: action.episodes
      });
    case FETCH_EPISODE:
      return Object.assign({}, state, {
        episodes: [action.episode]
      });
    case FETCH_GUESTS:
      return Object.assign({}, state, {
        guests: action.guests
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
