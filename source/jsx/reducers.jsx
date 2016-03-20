import _ from 'underscore';
import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import {
  SET_SELECTED_PROGRAM_ID,
  SET_SELECTED_EPISODE_ID,
  SET_SELECTED_GUEST_ID,
  SET_PLAYING_TRACK,
  SET_PLAYING_EPISODE,
  SET_PLAYING_AUDIO,
  SET_IS_PLAYING,
  SET_AUDIO_INTERVAL_ID,
  SET_AUDIO_CURRENT_TIME,
  SET_VOLUME,
  SET_MUTE_STATUS,
  SET_PAGE,
  SET_SORT,
  SET_LOADED_PERCENTAGE,
  ADD_COMMENTS,
  CLEAR_COMMENTS,
  REMOVE_COMMENT,
  GENERATE_AUDIO,
  TOGGLE_ACTIVE_TRACK,
  TOGGLE_ACTIVE_EPISODE,
  INIT_PLAYING,
  RESET_PLAYING,
  FETCH_PROGRAMS,
  FETCH_TRACKS,
  CLEAR_TRACKS,
  FETCH_PROGRAM_EPISODES,
  FETCH_GUEST_EPISODES,
  FETCH_EPISODE,
  FETCH_GUESTS
} from './actions';

let initialState = {
  searchResultTracks  : [],
  searchResultEpisodes: [],
  programs            : [],
  episodes            : [],
  guests              : [],
  comments            : [],
  selectedProgramId   : null,
  selectedEpisodeId   : null,
  selectedGuestId     : null,
  playingTrack        : null,
  playingEpisode      : null,
  playingAudio        : null,
  audioIntervalID     : null,
  audioCurrentTime    : null,
  isPlaying           : false,
  isMute              : false,
  volume              : 50,
  loadedPercentage    : 0,
  searchText          : '',
  filterPrograms      : [],
  filterGuests        : [],
  currentPage         : 1,
  perPage             : 5,
  total               : 0,
  sort                : 'desc'
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
    case SET_SELECTED_GUEST_ID:
      return Object.assign({}, state, {
        selectedGuestId: action.id
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
      if (state.isMute) {
        action.audio.volume = 0;
      } else {
        action.audio.volume = state.volume / 100;
      }
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
    case SET_VOLUME:
      localStorage.setItem('pickfm.volume', action.volume);
      if (state.playingAudio) {
        state.playingAudio.volume = action.volume / 100;
      }
      return Object.assign({}, state, {
        volume: action.volume
      });
    case SET_MUTE_STATUS:
      localStorage.setItem('pickfm.isMute', action.isMute);
      if (state.playingAudio) {
        if (action.isMute) {
          state.playingAudio.volume = 0;
        } else {
          state.playingAudio.volume = state.volume / 100;
        }
      }
      return Object.assign({}, state, {
        isMute: action.isMute
      });
    case SET_PAGE:
      return Object.assign({}, state, {
        currentPage: action.page
      });
    case SET_SORT:
      return Object.assign({}, state, {
        sort: action.sort
      });
    case SET_LOADED_PERCENTAGE:
      return Object.assign({}, state, {
        loadedPercentage: action.percentage
      });
    case ADD_COMMENTS:
      return Object.assign({}, state, {
        comments: [...state.comments, ...action.comments]
      });
    case CLEAR_COMMENTS:
      return Object.assign({}, state, {
        comments: []
      });
    case REMOVE_COMMENT:
      return Object.assign({}, state, {
        comments: _.reject(state.comments, (c) => {
          return c.id === action.id
        })
      });
    case GENERATE_AUDIO:
      return Object.assign({}, state, {
        playingAudio    : action.audio,
        playingEpisode  : action.episode,
        playingTrack    : action.track,
        audioCurrentTime: action.startTime
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
      if (state.playingAudio) {
        state.playingAudio.pause();
      }
      return Object.assign({}, state, {
        playingAudio      : null,
        playingTrack      : null,
        playingEpisode    : null,
        audioIntervalID   : null,
        audioCurrentTime  : null,
        isPlaying         : false,
        searchResultTracks: state.searchResultTracks.map((t) => {
          t.isActive = false;
          return t;
        }),
        episodes          : state.episodes.map((e) => {
          e.isActive = false;
          return e;
        })
      });
    case RESET_PLAYING:
      const resetTime = (() => {
        if (state.playingTrack) {
          return state.playingTrack.start_time;
        } else if (state.playingEpisode) {
          return 0;
        }
        return null;
      })();

      state.playingAudio.currentTime = resetTime;

      return Object.assign({}, state, {
        audioCurrentTime  : resetTime,
        isPlaying         : false,
        searchResultTracks: state.searchResultTracks.map((t) => {
          t.isActive = false;
          return t;
        }),
        episodes          : state.episodes.map((e) => {
          e.isActive = false;
          return e;
        })
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
        total     : action.total,
        searchText: action.searchText
      });
    case CLEAR_TRACKS:
      return Object.assign({}, state, {
        searchResultTracks  : [],
        searchResultEpisodes: [],
        searchText: '',
        total     : 0
      });
    case FETCH_PROGRAM_EPISODES:
      action.episodes.map((e) => {
        e.isActive = false;
      });
      return Object.assign({}, state, {
        episodes: action.episodes,
        total   : action.total
      });
    case FETCH_GUEST_EPISODES:
      action.episodes.map((e) => {
        e.isActive = false;
      });
      return Object.assign({}, state, {
        episodes: action.episodes,
        total   : action.total
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
