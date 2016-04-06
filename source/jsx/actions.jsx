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

export const SET_SELECTED_GUEST_ID = 'SET_SELECTED_GUEST_ID';
export function setSelectedGuestId(id) {
  return {
    type: SET_SELECTED_GUEST_ID, id
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

export const SET_VOLUME = 'SET_VOLUME';
export function setVolume(volume) {
  return {
    type: SET_VOLUME, volume
  };
}

export const SET_MUTE_STATUS = 'SET_MUTE_STATUS';
export function setMuteStatus(isMute) {
  return {
    type: SET_MUTE_STATUS, isMute
  };
}

export const SET_PAGE = 'SET_PAGE';
export function setPage(page) {
  if (page <= 0) {
    return;
  }
  return {
    type: SET_PAGE, page
  };
}

export const SET_SORT = 'SET_SORT';
export function setSort(sort) {
  if (!_.contains(['asc', 'desc', 'ASC', 'DESC'], sort)) {
    return;
  }
  return {
    type: SET_SORT, sort
  };
}

export const SET_LOADED_PERCENTAGE = 'SET_LOADED_PERCENTAGE';
export function setLoadedPercentage(percentage) {
  return {
    type: SET_LOADED_PERCENTAGE, percentage
  };
}

export const ADD_COMMENTS = 'ADD_COMMENTS';
export function addComments(comments, autoHiding) {
  return {
    type: ADD_COMMENTS, comments, autoHiding
  };
}

export const CLEAR_GARBAGE_COMMENTS = 'CLEAR_GARBAGE_COMMENTS';
export function clearGarbageComments() {
  return {
    type: CLEAR_GARBAGE_COMMENTS
  };
}

export const HIDE_COMMENT = 'HIDE_COMMENT';
export function hideComment(id) {
  return {
    type: HIDE_COMMENT, id
  };
}

export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export function removeComment(id) {
  return {
    type: REMOVE_COMMENT, id
  };
}

export const MARK_REMOVE_COMMENT = 'MARK_REMOVE_COMMENT';
export function markRemoveComment(id) {
  return {
    type: MARK_REMOVE_COMMENT, id
  };
}

export const GENERATE_AUDIO = 'GENERATE_AUDIO';
export function generateAudio(episode, track, startTime) {
  return (dispatch, getState) => {
    const volume = getState().pickApp.volume;
    const audio  = new Audio();

    audio.src = episode.url;
    audio.volume = volume / 100;

    audio.load();

    audio.addEventListener('loadedmetadata', () => {
      if (track) {
        // track再生の場合
        audio.currentTime = track.start_time;
      } else if (startTime) {
        // episode再生で開始時間を指定されている場合
        audio.currentTime = startTime;
      }
    });

    audio.addEventListener('loadeddata', () => {
      audio.play();
    });

    return dispatch({
      type: GENERATE_AUDIO, audio, episode, track, startTime
    });
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

export const RESET_PLAYING = 'RESET_PLAYING';
export function resetPlaying() {
  return {
    type: RESET_PLAYING
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
    return { type: FETCH_TRACKS, tracks: [], episodes: [], total: 0, searchText };
  }

  return function (dispatch, getState) {
    let query = getState().router.location.query;

    if (query) {
      query = Object.assign({}, query);
    } else {
      query = {};
    }
    if (!query.page)    { query.page = 1; }
    if (!query.perpage) { query.perpage = getState().pickApp.perPage; }
    if (!query.sort)    { query.sort = getState().pickApp.sort; }

    query.word = searchText;

    request
      .get('/api/search')
      .query(query)
      .end((err, res) => {
          return dispatch({
            type    : FETCH_TRACKS,
            tracks  : res.body.hits,
            episodes: res.body.episodes,
            total   : res.body.total,
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

export const FETCH_PROGRAM_EPISODES = 'FETCH_PROGRAM_EPISODES';
export function fetchProgramEpisodes(programId) {

  return function (dispatch, getState) {
    request
      .get(`/api/programs/${programId}/episodes`)
      .query({ page: getState().pickApp.currentPage, perpage: getState().pickApp.perPage, sort: getState().pickApp.sort })
      .end((err, res) => {
          return dispatch({
            type    : FETCH_PROGRAM_EPISODES,
            episodes: res.body.episodes,
            total   : res.body.total
          });
        }
      );
  };
}

export const FETCH_GUEST_EPISODES = 'FETCH_GUEST_EPISODES';
export function fetchGuestEpisodes(guestId) {

  return function (dispatch, getState) {
    request
      .get(`/api/guests/${guestId}/episodes`)
      .query({ page: getState().pickApp.currentPage, perpage: getState().pickApp.perPage, sort: getState().pickApp.sort })
      .end((err, res) => {
          return dispatch({
            type    : FETCH_GUEST_EPISODES,
            episodes: res.body.episodes,
            total   : res.body.total
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

export const POST_COMMENT = 'POST_COMMENT';
export function postComment(episodeId, comment, seconds) {

  seconds = Math.round(seconds);

  return function (dispatch) {
    request
      .post(`/api/comments`)
      .send({ episode_id: episodeId, comment, seconds })
      .end((err, res) => {
          if (err) {
            return;
          }
          return dispatch({
            type   : POST_COMMENT,
            comment: res.body.comment
          });
        }
      );
  };
}
