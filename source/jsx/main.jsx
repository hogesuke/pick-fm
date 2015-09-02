import React from 'react';
import PubSub from 'pubsub-js';
import PlayList from './playlist';
import ArticleList from './articlelist';

console.debug('PlayList', PlayList);
console.debug('ArticleList', ArticleList);

React.render(
  <div>
    <PlayList />
    <ArticleList />
  </div>,
  document.getElementById('content')
);
