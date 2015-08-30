var React = require('react');
var PubSub = require('pubsub-js');
var PlayList = require('./playlist');
var ArticleList = require('./articlelist');

React.render(
  <div>
    <PlayList />
    <ArticleList />
  </div>,
  document.getElementById('content')
);
