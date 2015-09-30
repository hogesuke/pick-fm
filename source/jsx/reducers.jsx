import { combineReducers } from 'redux';
import {
  ADD_TRACK_TO_PLAY_LIST,
  SEARCH_TRACKS,
  FETCH_TRACKS
} from './actions';

let initialState = {
  tracks: [
    { id: 0, program_name: 'test_program', personality: 'hogesuke', guests: 'hogesuke2', episode: 0, tag: 'hoge', start_time: 10, end_time: 20 }
  ],
  playListTracks: [],
  searchText: ''
};

function pickApp(state = initialState, action = "") {
  switch (action.type) {
    case ADD_TRACK_TO_PLAY_LIST:
      return Object.assign({}, state, {
        playListTracks: [...state.playListTracks, action.track]
      });
    case SEARCH_TRACKS:
      return Object.assign({}, state, {
        searchText: action.searchText
      });
    case FETCH_TRACKS:
      return Object.assign({}, state, {
        tracks: action.tracks
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  pickApp
});

export default rootReducer;
