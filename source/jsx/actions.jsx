import fetch from 'isomorphic-fetch';

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
export function fetchArticles() {

  return function (dispatch) {

    return fetch('http://localhost:9200/ldgourmet/restaurant/_search?pretty=true', {
      method: 'get',
      body: {
        "query" : {
          "simple_query_string" : {
            "query": "白金台 カフェ ボエム",
            "fields": ["name", "name_kana", "address"],
            "default_operator": "and"
          }
        }
      }
    }).then(response => response.json())
      .then(json => {
        return dispatch({
          type: FETCH_ARTICLES, restaurant: json
        });
      }
    );
  };
}
