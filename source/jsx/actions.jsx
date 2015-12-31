import elasticsearch from 'elasticsearch';
import request from 'superagent';
import _ from 'underscore';

export const ADD_TRACK_TO_PLAY_LIST = 'ADD_TRACK_TO_PLAY_LIST';
export function addTrackToPlayList(track) {
  return {
    type: ADD_TRACK_TO_PLAY_LIST, track
  };
}

// todo これいらないのでは？
export const SEARCH_TRACKS = 'SEARCH_TRACKS';
export function searchTracks(searchText) {
  return {
    type: SEARCH_TRACKS, searchText
  };
}

export const FETCH_TRACKS = 'FETCH_TRACKS';
export function fetchTracks(searchText) {

  if (searchText === '') {
    return { type: FETCH_TRACKS, tracks: [] };
  }

  return function (dispatch) {
    request
      .get(`/api/search?search_word=${searchText}`)
      .end((err, res) => {
          return dispatch({
            type: FETCH_TRACKS, tracks: res.body.hits, searchText
          });
        }
      );
  };
}
