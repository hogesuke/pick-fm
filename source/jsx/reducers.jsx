import { combineReducers } from 'redux';
import {
  ADD_ARTICLE_TO_PLAY_LIST,
  SEARCH_ARTICLES
} from './actions';

let initialState = {
  articles: [
    { title: 'title1', tags: ['docker', 'react'], url: 'http://cache.rebuild.fm/podcast-ep108.mp3' },
    { title: 'title2', tags: ['docker', 'angular'], url: 'http://cache.rebuild.fm/podcast-ep107.mp3' },
    { title: 'title3', tags: ['ruby', 'ios'], url: 'http://cache.rebuild.fm/podcast-ep106.mp3' },
    { title: 'title4', tags: ['go', 'ios'], url: 'http://cache.rebuild.fm/podcast-ep106.mp3' },
    { title: 'title5', tags: ['ruby', 'go'], url: 'http://cache.rebuild.fm/podcast-ep104.mp3' }
  ],
  playListArticles: [],
  searchText: ''
};

function pickApp(state = initialState, action = "") {
  switch (action.type) {
    case ADD_ARTICLE_TO_PLAY_LIST:
      return Object.assign({}, state, {
        playListArticles: [...state.playListArticles, action.article]
      });
    case SEARCH_ARTICLES:
      return Object.assign({}, state, {
        searchText: action.searchText
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  pickApp
});

export default rootReducer;
