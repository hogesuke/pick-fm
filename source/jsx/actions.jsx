import elasticsearch from 'elasticsearch';

let client = elasticsearch.Client({
  host: 'http://localhost:9200',
  log: 'trace'
});

export const ADD_ARTICLE_TO_PLAY_LIST = 'ADD_ARTICLE_TO_PLAY_LIST';
export function addArticleToPlayList(article) {
  return {
    type   : ADD_ARTICLE_TO_PLAY_LIST, article
  };
}

export const SEARCH_ARTICLES = 'SEARCH_ARTICLES';
export function searchArticles(searchText) {
  return {
    type: SEARCH_ARTICLES, searchText
  };
}

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export function fetchArticles(searchText) {

  return function (dispatch) {

    return client.search({
      index: 'pickfm',
      type : 'track',
      body : {
        "query": {
          "simple_query_string": {
            "query" : 'podcast',
            "fields": ['program_name', 'personality', 'guests', 'tag'],
            "default_operator": "and"
          }
        }
      }
    }).then(res => {
        return dispatch({
          type: FETCH_ARTICLES, tracks: res.hits.hits
        });
      }
    );
  };
}
