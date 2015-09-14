export const ADD_ARTICLE_TO_PLAY_LIST = 'ADD_ARTICLE_TO_PLAY_LIST';
export function addArticleToPlayList(article) {
  return {
    type   : ADD_ARTICLE_TO_PLAY_LIST,
    article: article
  };
}

export const SEARCH_ARTICLES = 'SEARCH_ARTICLES';
export function searchArticles(searchText) {
  return {
    type: SEARCH_ARTICLES, searchText
  };
}
