export const ADD_ARTICLE_TO_PLAY_LIST = 'ADD_ARTICLE_TO_PLAY_LIST';
export function addArticleToPlayList(article) {
  return {
    type   : ADD_ARTICLE_TO_PLAY_LIST,
    article: article
  };
}
