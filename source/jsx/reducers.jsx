let initialState = {
  articles: []
};

function pickApp(state = initialState, action = "") {
  switch (action.type) {
    case ADD_ARTICLE_TO_PLAY_LIST:
      return Object.assign({}, state, {
        todos: [...state.articles, action.article]
      });
    default:
      return state;
  }
}
