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

export const SET_AUDIO_INTERVAL_ID = 'SET_AUDIO_INTERVAL_ID';
export function setAudioIntervalID(intervalID) {
  return {
    type: SET_AUDIO_INTERVAL_ID, intervalID
  };
}

export const SET_AUDIO_CURRENT_TIME = 'SET_AUDIO_CURRENT_TIME';
export function setAudioCurrentTime(currentTime) {
  return {
    type: SET_AUDIO_CURRENT_TIME, currentTime
  };
}

export const TOGGLE_ACTIVE_TRACK = 'TOGGLE_ACTIVE_TRACK';
export function toggleActiveTrack(id) {
  return {
    type: TOGGLE_ACTIVE_TRACK, id
  };
}

export const TOGGLE_ACTIVE_EPISODE = 'TOGGLE_ACTIVE_EPISODE';
export function toggleActiveEpisode(id) {
  return {
    type: TOGGLE_ACTIVE_EPISODE, id
  };
}

export const INIT_PLAYING = 'INIT_PLAYING';
export function initPlaying() {
  return {
    type: INIT_PLAYING
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

  return function (dispatch, getState) {
    let query = getState().router.location.query;

    if (!query) { query = {}; }
    query.word = searchText;

    request
      .get('/api/search')
      .query(query)
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

export const CLEAR_TRACKS = 'CLEAR_TRACKS';
export function clearTracks() {
  return {
    type: CLEAR_TRACKS
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

export const FETCH_GUESTS = 'FETCH_GUESTS';
export function fetchGuests(guestIds) {

  return function (dispatch) {
    request
      .get(`/api/guests`)
      .query({ ids: guestIds })
      .end((err, res) => {
          return dispatch({
            type  : FETCH_GUESTS,
            guests: res.body
          });
        }
      );
  };
}
