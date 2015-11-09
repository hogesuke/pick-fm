import elasticsearch from 'elasticsearch';

let elasticsearch_url, logLevel;
let getQueryString = ( field, url ) => {
  var href = url ? url : window.location.href;
  var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
  var string = reg.exec(href);
  return string ? string[1] : null;
};

if (getQueryString('environment') === 'develop') {
  elasticsearch_url = 'http://localhost:9200/';
  logLevel = 'trace';
} else {
  elasticsearch_url = 'http://elasticsearch.pickfm.net/';
  logLevel = ['warning', 'error'];
}

let client = elasticsearch.Client({
  host: elasticsearch_url,
  log: logLevel
});

export const ADD_TRACK_TO_PLAY_LIST = 'ADD_TRACK_TO_PLAY_LIST';
export function addTrackToPlayList(track) {
  return {
    type: ADD_TRACK_TO_PLAY_LIST, track
  };
}

export const SEARCH_TRACKS = 'SEARCH_TRACKS';
export function searchTracks(searchText) {
  return {
    type: SEARCH_TRACKS, searchText
  };
}

export const FETCH_TRACKS = 'FETCH_TRACKS';
export function fetchTracks(searchText) {

  return function (dispatch) {

    return client.search({
      index: 'pickfm',
      type : 'track',
      body : {
        "query": {
          "simple_query_string": {
            "query" : searchText,
            "fields": ['program_name', 'personality', 'guests_en', 'guests_ja', 'tag_en', 'tag_ja'],
            "default_operator": "and"
          }
        }
      }
    }).then(res => {
        return dispatch({
          type: FETCH_TRACKS, tracks: _.pluck(res.hits.hits, '_source')
        });
      }
    );
  };
}
