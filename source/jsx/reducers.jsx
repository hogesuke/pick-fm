import { combineReducers } from 'redux';
import {
  SET_PLAYING_TRACK,
  FETCH_TRACKS
} from './actions';

let initialState = {
  tracks: [],
  episodeListTracks: [],
  playingTrack: null,
  searchText: ''
};

function pickApp(state = initialState, action = "") {
  switch (action.type) {
    case SET_PLAYING_TRACK:
      return Object.assign({}, state, {
        playingTrack: action.track
      });
    case FETCH_TRACKS:
      return Object.assign({}, state, {
        tracks: action.tracks,
        searchText: action.searchText
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  pickApp
});

export default rootReducer;
