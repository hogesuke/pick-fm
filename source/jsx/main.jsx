import React from 'react';
import Redux, { Provider } from 'redux';
import App from './app';
import pickApp from './reducers'

let store = Redux.createStore(pickApp);

React.render(
  <div>
    <App />
  </div>,
  document.getElementById('content')
);
