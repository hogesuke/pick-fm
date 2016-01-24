import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import rootReducer from './reducers'
import App from './components/app';
import Main from './components/main';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="search" component={Main} />
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
