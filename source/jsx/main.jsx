import React from 'react';
import PubSub from 'pubsub-js';
import PlayList from './playlist';
import ArticleList from './articlelist';

React.render(
  <div>
    <PlayList />
    <ArticleList />
  </div>,
  document.getElementById('content')
);
