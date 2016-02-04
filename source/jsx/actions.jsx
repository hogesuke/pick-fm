import elasticsearch from 'elasticsearch';
import request from 'superagent';
import _ from 'underscore';

export const SET_SELECTED_PROGRAM_ID = 'SET_SELECTED_PROGRAM_ID';
export function setSelectedProgramId(id) {
  return {
    type: SET_SELECTED_PROGRAM_ID, id
  };
}

export const SET_SELECTED_EPISODE_ID = 'SET_SELECTED_EPISODE_ID';
export function setSelectedEpisodeId(id) {
  return {
    type: SET_SELECTED_EPISODE_ID, id
  };
}

export const SET_PLAYING_TRACK = 'SET_PLAYING_TRACK';
export function setPlayingTrack(track) {
  return {
    type: SET_PLAYING_TRACK, track
  };
}
export const SET_PLAYING_EPISODE = 'SET_PLAYING_EPISODE';
export function setPlayingEpisode(episode) {
  return {
    type: SET_PLAYING_EPISODE, episode
  };
}

export const SET_PLAYING_AUDIO = 'SET_PLAYING_AUDIO';
export function setPlayingAudio(audio) {
  return {
    type: SET_PLAYING_AUDIO, audio
  };
}

export const SET_IS_PLAYING = 'SET_IS_PLAYING';
export function setIsPlaying(isPlaying) {
  return {
    type: SET_IS_PLAYING, isPlaying
  };
}

export const FETCH_PROGRAMS = 'FETCH_PROGRAMS';
export function fetchPrograms() {

  return function (dispatch) {
    request
      .get(`/api/programs`)
      .end((err, res) => {
          return dispatch({
            type    : FETCH_PROGRAMS,
            programs: res.body
          });
        }
      );
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

export const FETCH_EPISODES = 'FETCH_EPISODES';
export function fetchEpisodes(programId) {

  return function (dispatch) {
    request
      .get(`/api/programs/${programId}/episodes`)
      .end((err, res) => {
          return dispatch({
            type    : FETCH_EPISODES,
            episodes: res.body
          });
        }
      );
  };
}

export const FETCH_EPISODE = 'FETCH_EPISODE';
export function fetchEpisode(programId, episodeNo, episodeType) {

  if (!episodeType) { episodeType = 'regular' }

  return function (dispatch) {
    request
      .get(`/api/programs/${programId}/episodes/${episodeNo}/${episodeType}`)
      .end((err, res) => {
          return dispatch({
            type   : FETCH_EPISODE,
            episode: res.body
          });
        }
      );
  };
}
