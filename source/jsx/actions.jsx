import elasticsearch from 'elasticsearch';
import request from 'superagent';
import _ from 'underscore';

export const SET_PLAYING_TRACK = 'SET_PLAYING_TRACK';
export function setPlayingTrack(track) {
  return {
    type: SET_PLAYING_TRACK, track
  };
}

export const SET_PLAYING_AUDIO = 'SET_PLAYING_AUDIO';
export function setPlayingAudio(audio) {
  return {
    type: SET_PLAYING_AUDIO, audio
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
            type    : FETCH_TRACKS,
            tracks  : res.body.hits,
            episodes: res.body.episodes,
            searchText
          });
        }
      );
  };
}
