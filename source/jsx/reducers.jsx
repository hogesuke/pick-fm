import { combineReducers } from 'redux';
import {
  ADD_ARTICLE_TO_PLAY_LIST,
  SEARCH_ARTICLES
} from './actions';

let initialState = {
  articles: [
    { title: 'title1', tags: ['docker', 'react'] },
    { title: 'title2', tags: ['docker', 'angular'] },
    { title: 'title3', tags: ['ruby', 'ios'] },
    { title: 'title4', tags: ['go', 'ios'] },
    { title: 'title5', tags: ['ruby', 'go'] }
  ],
  searchText: ''
};

function pickApp(state = initialState, action = "") {
  switch (action.type) {
    case ADD_ARTICLE_TO_PLAY_LIST:
      return Object.assign({}, state, {
        articles: [...state.articles, action.article]
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
