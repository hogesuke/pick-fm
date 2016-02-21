import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import rootReducer from './reducers'
import App from './containers/App';
import ProgramListPage from './containers/ProgramListPage';
import ProgramEpisodeListPage from './containers/ProgramEpisodeListPage';
import GuestEpisodeListPage from './containers/GuestEpisodeListPage';
import EpisodeDetailPage from './containers/EpisodeDetailPage';
import SearchPage from './containers/SearchPage';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={ProgramListPage} />
    <Route path="programs/:programId/episodes" component={ProgramEpisodeListPage} />
    <Route path="programs/:programId/episodes/:episodeNo" component={EpisodeDetailPage} />
    <Route path="programs/:programId/episodes/:episodeNo/:episodeType" component={EpisodeDetailPage} />
    <Route path="guests/:guestId/episodes" component={GuestEpisodeListPage} />
    <Route path="search" component={SearchPage} />
  </Route>
);

const store = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({
    routes,
    createHistory
  })
)(createStore)(rootReducer);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <ReduxRouter />
    </Provider>
  </div>,
  document.getElementById('content')
);
