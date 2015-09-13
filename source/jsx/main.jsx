import React from 'react';
import { createStore, Provider } from 'redux';
import App from './app';
import pickApp from './reducers'

let store = createStore(pickApp);

React.render(
  <div>
    <App />
  </div>,
  document.getElementById('content')
);
